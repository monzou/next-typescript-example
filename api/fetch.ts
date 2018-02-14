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

export function resolve(host: string, relative: string, params?: {}) {
  const path = `${host}/${relative}`
  if (params) {
    return `${path}?${toQueryParams(params)}`
  }
  return path
}

export function toQueryParams(params: {}) {
  return Object.keys(params)
    .filter(key => params[key])
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')
}

export function request<T>(method: Method, host: string, relative: string, params?: {}): Promise<T> {
  const path = resolve(host, relative, params)
  const options: RequestInit = {
    method,
    cache: 'no-cache',
    mode: 'cors'
    // credentials: 'include'
  }
  switch (method) {
    case 'POST':
    case 'PUT':
    case 'PATCH':
    case 'DELETE':
      options.headers = new Headers({ 'Content-Type': 'application/json' })
      options.body = params ? JSON.stringify(params) : '{}'
      break
    default:
      break
  }
  return timeout(TIMEOUT_MSEC, wrap(fetch(path, options)))
}
