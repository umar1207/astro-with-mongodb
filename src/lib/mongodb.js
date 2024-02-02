// src/lib/mongodb.js

// This file will help to us to connect to our MongoDB. 
// To keep things simple, I’ve also exported the Users collection in this file.

import { MongoClient } from "mongodb";

if (!import.meta.env.MONGODB_URI) {
  throw new Error('Invalid environment variable: "MONGODB_URI"');
}

const uri = import.meta.env.MONGODB_URI;
// const uri = process.env.MONGODB_URI;
const options = {};
let cachedMongo;

const connectToDB = async () => {
  const mongo = await new MongoClient(uri, options).connect();
  // Change this to your own DB name of course.
  // Or better yet, put it in your .env
  return mongo.db("astro-mongodb");
};

export const getDB = async () => {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  // Text above copied from :
  // https://github.com/vercel/next.js/blob/canary/examples/with-mongodb/lib/mongodb.ts

  // in development mode
  if (import.meta.env.NODE_ENV === "development") {
    if (!global._mongoConnection) {
      global._mongoConnection = await connectToDB();
      cachedMongo = global._mongoConnection;
    }
    return cachedMongo;
  }

  // in production mode
  const mongo = await connectToDB();
  return mongo;
};

export const Users = async () => {
  const db = await getDB();
  return db.collection("users");
};