import {IDanbooruSearchResponse} from '../types';
import request from './request';

const authorization =
  'Basic ' +
  btoa(
    `${Bun.env['SHIORI_AIBOORU_USERNAME']}:${Bun.env['SHIORI_AIBOORU_API_KEY']}`
  );

export default async function aibooru(tags: string, safe = false) {
  const url = new URL(
    `https://${safe ? 'safe.' : ''}aibooru.online/posts/random.json`
  );
  url.searchParams.append('tags', tags);
  return request<IDanbooruSearchResponse>(url, {
    headers: {
      Authorization: authorization,
    },
  });
}
