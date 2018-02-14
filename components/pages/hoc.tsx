import * as http from 'http'
import * as React from 'react'
import { wrapDisplayName } from 'recompose'
import { Action } from 'typescript-fsa'
import RootState from '../../store/root-state'

export interface ReduxStore {
  dispatch(action: Action<any>): void
  getState(): RootState
}

export interface Context {
  readonly pathname: string
  readonly query: any
  readonly asPath: string
  readonly req?: http.IncomingMessage
  readonly res?: http.ServerResponse
  readonly jsonPageRes?: Response
  readonly err?: any
  readonly store: ReduxStore
  readonly isServer: boolean
}

type InitialProps<P> = Partial<P> | Promise<Partial<P>> | void | Promise<void>
type InitialPropsProvider<P> = (context: Context) => InitialProps<P>
type InitialPropsEnhancer<P> = (component: React.ComponentType<P>) => React.ComponentType<P>

export function initialProps<P>(provider: InitialPropsProvider<P>): InitialPropsEnhancer<P> {
  return (BaseComponent: React.ComponentType<P>): React.ComponentType<P> => {
    return class extends React.Component<P> {
      public static displayName = wrapDisplayName(BaseComponent, 'withInitialProps')
      public static async getInitialProps(context: Context) {
        const WrappedComponent = BaseComponent as any
        if (WrappedComponent.getInitialProps) {
          return WrappedComponent.getInitialProps(context)
        }
        return provider(context)
      }
      public render() {
        return <BaseComponent {...this.props} />
      }
    }
  }
}
