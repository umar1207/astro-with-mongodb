// help us read and write data from our MongoDB

// /src/lib/users.js
import { Users } from "./mongodb";

export const getAllUsers = async () => {
  const users = await (await Users()).find({}).toArray();
  return users;
};

export const createUser = async (newUser) => {
  const user = await (await Users()).insertOne(newUser);
  return user;
};