import { atom, useAtom } from 'jotai'
import { RPCClient } from '../lib/rpcClient'
import { useEffect } from 'react'

const normalizeBackendURL = (raw: string) => {
  const withProtocol = raw.startsWith('http://') || raw.startsWith('https://')
    ? raw
    : `http://${raw}`
  return withProtocol.replace(/\/+$/, '')
}

const backendBaseURL = normalizeBackendURL(
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:3033'
)
const httpURL = `${backendBaseURL}/rpc/http`
const wsURL = backendBaseURL.replace(/^http/, 'ws') + '/rpc/ws'

export const rpcClientAtom = atom(new RPCClient(httpURL, wsURL))
export const downloadsAtom = atom<any[]>([])
export const loadingAtom = atom(false)

export const useRPC = () => {
  const [client] = useAtom(rpcClientAtom)
  const [downloads, setDownloads] = useAtom(downloadsAtom)

  useEffect(() => {
    const sub = client.socket$.subscribe((res) => {
      if (res.result && Array.isArray(res.result)) {
        setDownloads(res.result)
      }
    })
    
    // Initial check
    client.running().then((res) => {
      if (res.result && Array.isArray(res.result)) {
        setDownloads(res.result)
      }
    }).catch(() => {
      // no-op: websocket/HTTP failures are handled by component UX
    })
    
    return () => sub.unsubscribe()
  }, [client, setDownloads])

  return { client, downloads }
}
