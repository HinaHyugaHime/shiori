import userAgent from './userAgents';

export default async function request<T>(
  url: URL | string,
  options: RequestInit & {firefoxUA?: boolean} = {}
) {
  return fetch(url, {
    ...options,
    headers: {
      'User-Agent': options.firefoxUA ? userAgent.firefox : userAgent.shiori,
      ...options.headers,
    },
  }).then(res => res.json()) as Promise<T>;
}
