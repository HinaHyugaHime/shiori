import {IMoebooruSearchResponse} from '../types';
import request from './request';

export default async function moebooru(tags: string, instance: string) {
  const url = new URL(`${instance}`);
  url.pathname = 'post.json';
  url.searchParams.append('tags', tags);
  return request<IMoebooruSearchResponse[]>(url);
}
