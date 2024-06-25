
export type State<T> = {
    type: 'loading'
  } | {
    type: 'error',
    message: string
  } | {
    type: 'data',
    data: T
  }