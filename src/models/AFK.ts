import {Filter, FindOptions, ObjectId, UpdateFilter} from 'mongodb';

import getMongoClient from '../lib/mongoClient';

const mongoClient = getMongoClient();

export default class AFK {
  private _id: ObjectId;
  public createdAt: Date;
  public deleted: boolean;
  public message: string;
  public updatedAt: Date;
  public user: string;

  public constructor(user: string, message: string, _id = new ObjectId()) {
    this._id = _id;
    this.createdAt = new Date();
    this.deleted = false;
    this.message = message;
    this.updatedAt = new Date();
    this.user = user;
  }

  public static async find(
    afkUser: Filter<AFK>,
    options: FindOptions<AFK> = {}
  ) {
    return mongoClient
      .db()
      .collection<AFK>('afkUsers')
      .find(afkUser, options)
      .toArray();
  }

  public static async findOne(
    afkUser: Filter<AFK>,
    options: FindOptions<AFK> = {}
  ) {
    return mongoClient
      .db()
      .collection<AFK>('afkUsers')
      .findOne(afkUser, options);
  }

  public static async updateOne(
    afkUser: Filter<AFK>,
    update: UpdateFilter<AFK>
  ) {
    return mongoClient
      .db()
      .collection<AFK>('afkUsers')
      .updateOne(afkUser, update);
  }

  public async save() {
    return mongoClient.db().collection('afkUsers').insertOne(this.toJSON());
  }

  public toJSON() {
    return {
      _id: this._id,
      createdAt: this.createdAt,
      deleted: this.deleted,
      message: this.message,
      updatedAt: this.updatedAt,
      user: this.user,
    };
  }
}
