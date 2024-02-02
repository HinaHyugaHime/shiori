import {IPivixResponse} from '../types';
import request from './request';

export default async function pivix(tags: string) {
  const url = new URL(`${Bun.env['SHIORI_PIXIV_API_URI']}`);
  url.pathname = 'api/pixiv/search';
  const imgProxyUrl = new URL(`${Bun.env['SHIORI_PIXIV_IMG_PROXY_URI']}`);
  url.searchParams.append('word', tags);
  const {illusts} = await request<IPivixResponse>(url, {});
  const post = illusts[Math.floor(illusts.length * Math.random())];
  if (!post) {
    return;
  }
  const randomPage =
    post.meta_pages[Math.floor(post.meta_pages.length * Math.random())];
  let imageUrl: string;
  if (!randomPage) {
    imageUrl = post.meta_single_page.original_image_url ?? '';
  } else {
    imageUrl = randomPage.image_urls.original;
  }
  if (imageUrl) {
    const img = new URL(imageUrl);
    img.hostname = imgProxyUrl.hostname;
    return {
      id: post.id,
      url: img.toString(),
    };
  }
}
