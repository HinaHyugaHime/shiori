import {MongoClient} from 'mongodb';

const mongo = new MongoClient(`${process.env['SHIORI_MONGO_URI']}`);
const mongoClient = await mongo.connect();

export default function getMongoClient(): MongoClient {
  return mongoClient;
}
