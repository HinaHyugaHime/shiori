import {ISafebooruPost} from '../types';
import request from './request';

export default async function safebooru(tags: string) {
  const url = new URL('https://safebooru.org/index.php');
  url.searchParams.append('page', 'dapi');
  url.searchParams.append('s', 'post');
  url.searchParams.append('q', 'index');
  url.searchParams.append('json', '1');
  url.searchParams.append('tags', tags);
  return request<ISafebooruPost[]>(url, {});
}
