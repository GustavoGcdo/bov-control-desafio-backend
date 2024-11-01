import { configDotenv } from 'dotenv';
import { MongoClient } from 'mongodb';
configDotenv();

const client = new MongoClient(process.env.MONGO_DB_URL);

/** @type {import("mongodb").Db} */
let db;


const connectDB = async () => {
  try {
    await client.connect();
    console.log('[database] > mongodb connected');
    const DB_NAME = 'bov-control-test';
    db = client.db(DB_NAME);
  } catch (error) {
    console.error('[database] fail to connect mongodb', error);
    process.exit(1);
  }
}

/** 
 * Return the DB instance
 * @returns {import("mongodb").Db} Instance of mongodb
 */
const getDB = () => {
  if (!db) {
    throw new Error('database not initialized. required call connectDB() first.');
  }
  return db;
}

export { connectDB, getDB };
