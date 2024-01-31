import {Filter, FindOptions, ObjectId, UpdateFilter} from 'mongodb';

import getMongoClient from '../lib/mongoClient';

const mongoClient = getMongoClient();

export default class Marriage {
  private _id: ObjectId;
  public couples: string[];
  public createdAt: Date;
  public deleted: boolean;
  public updatedAt: Date;

  public constructor(couples: string[], _id = new ObjectId()) {
    this._id = _id;
    if (couples.length !== 2) {
      throw new Error('Marriage must have exactly 2 couples');
    }
    this.couples = couples;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deleted = false;
  }

  public static async find(
    marriage: Filter<Marriage>,
    options: FindOptions<Marriage> = {}
  ) {
    return mongoClient
      .db()
      .collection<Marriage>('marriages')
      .find(marriage, options)
      .toArray();
  }

  public static async findOne(
    marriage: Filter<Marriage>,
    options: FindOptions<Marriage> = {}
  ) {
    return mongoClient
      .db()
      .collection<Marriage>('marriages')
      .findOne(marriage, options);
  }

  public static async updateOne(
    marriage: Filter<Marriage>,
    update: UpdateFilter<Marriage>
  ) {
    return mongoClient
      .db()
      .collection<Marriage>('marriages')
      .updateOne(marriage, update);
  }

  public async save() {
    return mongoClient.db().collection('marriages').insertOne(this.toJSON());
  }

  public toJSON() {
    return {
      _id: this._id,
      couples: this.couples,
      createdAt: this.createdAt,
      deleted: this.deleted,
      updatedAt: this.updatedAt,
    };
  }
}
