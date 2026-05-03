import { Observable } from 'rxjs'
import { WebSocketSubject, webSocket } from 'rxjs/webSocket'
import type { RPCRequest, RPCResponse } from '../types'

type DownloadRequestArgs = {
  url: string,
  args: string,
  pathOverride?: string,
  renameTo?: string,
  playlist?: boolean
}

export class RPCClient {
  private seq: number
  private httpEndpoint: string
  private readonly _socket$: WebSocketSubject<any>
  private readonly token?: string

  constructor(httpEndpoint: string, webSocketEndpoint: string, token?: string) {
    this.seq = 0
    this.httpEndpoint = httpEndpoint
    this._socket$ = webSocket<any>({
      url: token ? `${webSocketEndpoint}?token=${token}` : webSocketEndpoint
    })
    this.token = token
  }

  public get socket$(): Observable<RPCResponse<any>> {
    return this._socket$
  }

  private incrementSeq() {
    return String(this.seq++)
  }

  private async sendHTTP<T>(req: RPCRequest) {
    const res = await fetch(this.httpEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authentication': this.token ?? ''
      },
      body: JSON.stringify({
        ...req,
        id: this.incrementSeq(),
      })
    })
    if (!res.ok) {
      const message = await res.text()
      throw new Error(message || `HTTP ${res.status}`)
    }
    const data: RPCResponse<T> = await res.json()
    if ((data as any).error) {
      throw new Error(typeof (data as any).error === 'string' ? (data as any).error : 'RPC request failed')
    }
    return data
  }

  public download(req: DownloadRequestArgs) {
    if (!req.url) return

    return this.sendHTTP({
      method: req.playlist ? 'Service.ExecPlaylist' : 'Service.Exec',
      params: [{
        URL: req.url,
        Params: req.args.split(' ').filter(Boolean),
        Path: req.pathOverride || '',
        Rename: req.renameTo || '',
      }]
    })
  }

  public running() {
    return this.sendHTTP<any[]>({
      method: 'Service.Running',
      params: [],
    })
  }

  public kill(id: string) {
    return this.sendHTTP({
      method: 'Service.Kill',
      params: [id],
    })
  }
}
