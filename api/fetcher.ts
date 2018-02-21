import 'isomorphic-unfetch'

type Method = 'HEAD' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
const TIMEOUT_MSEC = 60 * 5 * 1000

const timeout = <T>(msec: number, promise: Promise<T>): Promise<T> => {
  return new Promise((success, failure) => {
    const tid = setTimeout(() => {
      failure(new Error(`Request has been timed out (${msec} msec)`))
    }, msec)
    promise.then(
      response => {
        clearTimeout(tid)
        success(response)
      },
      error => {
        clearTimeout(tid)
        failure(error)
      }
    )
  })
}

const wrap = <T>(fetch: Promise<Response>): Promise<T> => {
  return new Promise((success, failure) => {
    fetch.then(
      response => {
        if (response.ok) {
          response.json().then(
            json => {
              success(json)
            },
            error => {
              failure(error)
            }
          )
        } else {
          failure(response)
        }
      },
      error => {
        failure(error)
      }
    )
  })
}

const resolve = (host: string, relative: string, params?: {}) => {
  const path = `${host}/${relative}`
  if (params) {
    const q = toQueryParams(params)
    if (q) {
      return `${path}?${q}`
    }
  }
  return path
}

const toQueryParams = (params: {}) => {
  return Object.keys(params)
    .filter(key => params[key])
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')
}

export interface FetchOptions {
  host: string
  cache: RequestCache
  mode: RequestMode
  credentials: RequestCredentials
}

export class Fetch {
  private headers: { [name: string]: string }
  constructor(private options: FetchOptions, private method: Method, private path: string, private params?: {}) {
    this.headers = { 'Content-Type': 'application/json' }
  }
  public addHeader(name: string, value: string): Fetch {
    this.headers[name] = value
    return this
  }
  public exec<T>(): Promise<T> {
    const { method, path, params, headers } = this
    const { host, cache, mode, credentials } = this.options
    const options: RequestInit = {
      method: this.method,
      cache,
      mode,
      credentials,
      headers
    }
    switch (method) {
      case 'POST':
      case 'PUT':
      case 'PATCH':
      case 'DELETE':
        options.body = params ? JSON.stringify(params) : '{}'
        break
      default:
        break
    }
    const uri = resolve(host, path, method === 'HEAD' || method === 'GET' ? params : {})
    return timeout(TIMEOUT_MSEC, wrap(fetch(uri, options)))
  }
}

export class Fetcher {
  private options: FetchOptions
  constructor(
    host: string,
    options: {
      cache?: RequestCache
      mode?: RequestMode
      credentials?: RequestCredentials
    } = {}
  ) {
    const { cache, mode, credentials } = options
    this.options = {
      host,
      cache: cache || 'no-cache',
      mode: mode || 'cors',
      credentials: credentials || 'include'
    }
  }
  public fetch(method: Method, path: string, params?: {}): Fetch {
    return new Fetch(this.options, method, path, params)
  }
}

export default Fetcher
