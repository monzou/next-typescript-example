import 'typescript-fsa'

declare module 'typescript-fsa' {
  export type AsyncAction<P, R, E> = Action<P> | Action<Success<P, R>> | Action<Failure<P, E>>
}
