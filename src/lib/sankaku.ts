import {ISankakuAuthTokenResponse, ISankakuSearchResponse} from '../types';
import request from './request';

export async function cacheAuthToken() {
  const url = new URL('https://capi-v2.sankakucomplex.com/auth/token');
  return request<ISankakuAuthTokenResponse>(url, {
    body: JSON.stringify({
      login: process.env['SHIORI_SANKAKU_USERNAME'],
      password: process.env['SHIORI_SANKAKU_PASSWORD'],
    }),
    firefoxUA: true,
    headers: {
      Accept: 'application/vnd.sankaku.api+json;v=2',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });
}

export default async function sankaku(token: string, tags: string) {
  const url = new URL('https://capi-v2.sankakucomplex.com/posts/keyset');
  url.searchParams.append('lang', 'en');
  url.searchParams.append('default_threshold', '1');
  url.searchParams.append('hide_posts_in_books', 'in-larger-tags');
  url.searchParams.append('limit', '40');
  url.searchParams.append('tags', `order:popularity ${tags}`);
  return request<ISankakuSearchResponse>(url, {
    firefoxUA: true,
    headers: {
      Accept: 'application/vnd.sankaku.api+json;v=2',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}
