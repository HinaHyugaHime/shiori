import {IKemonoPost} from '../types';
import request from './request';

export default async function kemono(tags: string) {
  const url = new URL('https://kemono.su/api/v1/posts');
  url.searchParams.append('q', tags);
  return request<IKemonoPost[]>(url, {});
}
