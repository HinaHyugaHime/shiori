import {Collection} from 'discord.js';
import {OptionalId} from 'mongodb';

import Marriage from '../models/Marriage';
import BaseCommand from '../structures/BaseCommand';

export type AliasCollection = Collection<string, string>;

export type CommandCollection = Collection<string, BaseCommand>;

export type CooldownCollection = Collection<string, number>;

export type MarriageCollection = Collection<
  string,
  OptionalId<Omit<Marriage, 'save' | 'toJSON'> & {partner: string}>
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

export interface ISankakuErrorResponse {}

export interface ISankakuAuthTokenResponse {
  access_token: string;
  success: boolean;
}

export interface ISankakuPost {
  file_type: 'image/jpeg' | 'image/png' | 'video/mp4';
  file_url: string;
  id: number;
  preview_url: string;
  sample_url: string;
}

export interface ISankakuSearchResponse {
  data: ISankakuPost[];
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
