import sharp from 'sharp';

import {INozomiPost} from '../types';
import userAgents from './userAgents';

export function getHashedPath(post: string) {
  return post.length < 3
    ? post
    : `${post.slice(-1)}/${post.slice(-3, -1)}/${post}`;
}

export async function searchByTag(tag: string) {
  let size = 0;
  const dataView = await fetch(
    `https://j.nozomi.la/nozomi/${tag.replace(/[/#%]/g, '')}.nozomi`,
    {
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'arraybuffer',
        'User-Agent': userAgents.firefox,
      },
    }
  )
    .then(res => res.arrayBuffer())
    .then(res => {
      size = res.byteLength;
      return new DataView(res);
    });
  const posts: number[] = [];
  const totalIds = size / 4;
  for (let i = 0; i < totalIds; i++) {
    posts.push(dataView.getUint32(i * 4, false));
  }
  return posts;
}

export default async function nozomi(tag: string) {
  const posts = await searchByTag(tag);
  const post = posts[Math.floor(Math.random() * posts.length)].toString();
  const postData = (await fetch(
    `https://j.nozomi.la/post/${getHashedPath(post)}.json`,
    {
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        'User-Agent': userAgents.firefox,
      },
    }
  ).then(res => res.json())) as INozomiPost;
  if (postData && !postData.is_video) {
    const isGIF = postData.type === 'gif';
    const subDomain = isGIF ? 'g' : 'w';
    const urlType = isGIF ? 'gif' : 'webp';
    const media = await fetch(
      `https://${subDomain}.nozomi.la/${getHashedPath(postData.dataid)}.${urlType}`,
      {
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          Referer: 'https://nozomi.la/',
          'Upgrade-Insecure-Requests': '1',
          'User-Agent': userAgents.firefox,
        },
      }
    ).then(res => res.arrayBuffer());
    return {
      buffer: isGIF ? Buffer.from(media) : await sharp(media).png().toBuffer(),
      url: `https://nozomi.la/post/${postData.postid}.html`,
    };
  }
}
