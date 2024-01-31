import {IDanbooruSearchResponse} from '../types';
import request from './request';

const authorization =
  'Basic ' +
  btoa(
    `${process.env['SHIORI_DANBOORU_USERNAME']}:${process.env['SHIORI_DANBOORU_API_KEY']}`
  );

export default async function danbooru(tags: string) {
  const url = new URL('https://danbooru.donmai.us/posts/random.json');
  url.searchParams.append('tags', tags);
  return request<IDanbooruSearchResponse>(url, {
    headers: {
      Authorization: authorization,
    },
  });
}
