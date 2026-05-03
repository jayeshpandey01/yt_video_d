export type RPCMethods =
  | "Service.Exec"
  | "Service.Kill"
  | "Service.Clear"
  | "Service.Running"
  | "Service.KillAll"
  | "Service.FreeSpace"
  | "Service.Formats"
  | "Service.ExecPlaylist"
  | "Service.DirectoryTree"
  | "Service.UpdateExecutable"
  | "Service.ExecLivestream"
  | "Service.ProgressLivestream"
  | "Service.KillLivestream"
  | "Service.KillAllLivestream"
  | "Service.ClearCompleted"

export type RPCRequest = {
  method: RPCMethods
  params?: any[]
  id?: string
}

export type RPCResponse<T> = Readonly<{
  result: T
  error: number | null
  id?: string
}>

export const ProcessStatus = {
  PENDING: 0,
  DOWNLOADING: 1,
  COMPLETED: 2,
  ERRORED: 3,
  LIVESTREAM: 4,
} as const

export type ProcessStatus = typeof ProcessStatus[keyof typeof ProcessStatus]

export type RPCResult = Readonly<{
  id: string
  progress: {
    speed: number
    eta: number
    percentage: string
    process_status: ProcessStatus
  }
  info: {
    url: string
    thumbnail: string
    title: string
  }
}>
