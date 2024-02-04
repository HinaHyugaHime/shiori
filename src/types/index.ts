import {Collection} from 'discord.js';
import {WithId} from 'mongodb';

import AFK from '../models/AFK';
import Marriage from '../models/Marriage';
import BaseCommand from '../structures/BaseCommand';

export type AFKCollection = Collection<
  string,
  WithId<Omit<AFK, 'save' | 'toJSON'>>
>;

export type AliasCollection = Collection<string, string>;

export type CommandCollection = Collection<string, BaseCommand>;

export type CooldownCollection = Collection<string, number>;

export type MarriageCollection = Collection<
  string,
  WithId<Omit<Marriage, 'save' | 'toJSON'> & {partner: string}>
>;

export enum CommandType {
  SFW,
  NSFW,
}

export interface ICommandData {
  aliases: string[];
  cooldown: number;
  description: string;
  hidden: boolean;
  name: string;
  type: CommandType;
}

export type MessageContentGenerator = (user: string, target?: string) => string;

export interface IGIFCommandData extends ICommandData {
  contentGenerator: MessageContentGenerator;
  fallbackGIFs: string[];
  targetRequired: boolean;
  targetRequiredMessage: string;
}

export interface IWaifuCommandData extends IGIFCommandData {
  endpoint: string;
}

export interface IWaifuResponse {
  url: string;
}

export interface IDanbooruErrorResponse {
  message: string;
  success: boolean;
}

export interface IDanbooruSearchResponse {
  file_ext: 'jpg' | 'mp4' | 'png';
  file_url: string;
  id: number;
  large_file_url: string;
  preview_file_url: string;
}

export interface IGelbooruPost {
  file_url: string;
  id: number;
  large_file_url: string;
  preview_file_url: string;
}

export interface IGelbooruSearchResponse {
  '@attributes': {
    count: number;
    limit: number;
    offset: number;
  };
  post: IGelbooruPost[];
}

export interface ISafebooruPost {
  change: number;
  directory: string;
  hash: string;
  height: number;
  id: number;
  image: string;
  owner: string;
  parent_id: number;
  rating: string;
  sample: boolean;
  sample_height: number;
  sample_width: number;
  score: number;
  tags: string;
  width: number;
}

export interface INozomiPost {
  artist: {
    tag: string;
    tagname_display: string;
    tagtype: string;
    tagurl: string;
  }[];
  character: {
    tag: string;
    tagname_display: string;
    tagtype: string;
    tagurl: string;
  }[];
  dataid: string;
  date: string;
  general: {
    tag: string;
    tagname_display: string;
    tagtype: string;
    tagurl: string;
  }[];
  height: number;
  imageurls: {
    dataid: string;
    height: number;
    is_video: string;
    type: string;
    width: number;
  }[];
  is_video: string;
  postid: number;
  type: string;
  width: number;
}

export interface IKemonoPost {
  attachments: {
    name: string;
    path: string;
  }[];
  file: {
    name?: string;
    path?: string;
  };
  id: string;
  published: string;
  service: string;
  substring: string;
  title: string;
  user: string;
}

export interface IPivixImageUrls {
  large: string;
  medium: string;
  square_medium: string;
}

export interface IPivixOriginalImageUrls extends IPivixImageUrls {
  original: string;
}

export interface IPivixPost {
  caption: string;
  create_date: string;
  height: number;
  id: number;
  illust_ai_type: number;
  illust_book_style: number;
  image_urls: IPivixImageUrls;
  is_bookmarked: boolean;
  is_muted: boolean;
  meta_pages: {
    image_urls: IPivixOriginalImageUrls;
  }[];
  meta_single_page: {
    original_image_url?: string;
  };
  page_count: number;
  restrict: number;
  sanity_level: number;
  tags: {
    name: string;
    translated_name?: string;
  }[];
  title: string;
  tools: [];
  total_bookmarks: number;
  total_view: number;
  type: string;
  user: {
    account: string;
    id: number;
    is_followed: boolean;
    name: string;
    profile_image_urls: Partial<IPivixOriginalImageUrls>;
  };
  visible: boolean;
  width: number;
  x_restrict: number;
}

export interface IPivixResponse {
  illusts: IPivixPost[];
}

export interface IWaifuITResponse {
  url: string;
}

export interface IWaifuIMImage {
  artist: null | string;
  byte_size: number;
  dominant_color: string;
  extension: string;
  favorites: number;
  height: number;
  image_id: number;
  is_nsfw: boolean;
  liked_at: null;
  preview_url: string;
  signature: string;
  source: string;
  tags: {
    description: string;
    is_nsfw: boolean;
    name: string;
    tag_id: number;
  }[];
  uploaded_at: string;
  url: string;
  width: number;
}

export interface IWaifuIMResponse {
  images: IWaifuIMImage[];
}

export interface IPurrResponse {
  error: boolean;
  link: string;
  time: number;
}

export interface IMoebooruSearchResponse {
  actual_preview_height: number;
  actual_preview_width: number;
  author: string;
  change: number;
  created_at: number;
  creator_id: number;
  file_size: number;
  file_url: string;
  frames: unknown[];
  frames_pending: unknown[];
  frames_pending_string: string;
  frames_string: string;
  has_children: boolean;
  height: number;
  id: number;
  is_held: boolean;
  is_shown_in_index: boolean;
  jpeg_file_size: number;
  jpeg_height: number;
  jpeg_url: string;
  jpeg_width: number;
  md5: string;
  parent_id: null | string;
  preview_height: number;
  preview_url: string;
  preview_width: number;
  rating: string;
  sample_file_size: number;
  sample_height: number;
  sample_url: string;
  sample_width: number;
  score: number;
  source: string;
  status: string;
  tags: string;
  width: number;
}

export interface INightAPIResponse {
  content: {
    id: number;
    url: string;
  };
  status: number;
}
