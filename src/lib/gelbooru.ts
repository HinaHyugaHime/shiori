import {IGelbooruSearchResponse} from '../types';
import request from './request';

export default async function gelbooru(tags: string) {
  const url = new URL('https://www.gelbooru.com/index.php');
  url.searchParams.append('page', 'dapi');
  url.searchParams.append('s', 'post');
  url.searchParams.append('q', 'index');
  url.searchParams.append('api_key', `${Bun.env['SHIORI_GELBOORU_API_KEY']}`);
  url.searchParams.append('user_id', `${Bun.env['SHIORI_GELBOORU_USER_ID']}`);
  url.searchParams.append('json', '1');
  url.searchParams.append('tags', tags);
  return request<IGelbooruSearchResponse>(url, {});
}
