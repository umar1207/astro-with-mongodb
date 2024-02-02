// src/pages/api/users.js

// Let’s create a couple of API routes that can be consumed from the client.

import { createUser, getAllUsers } from "../../lib/users";

export const GET = async () => {
  const users = await getAllUsers();
  if (!users) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  return new Response(JSON.stringify(users), {
    status: 200,
  });
};

export const POST = async ({ request }) => {
    const newUser = await request.json();
    const user = await createUser(newUser);
    return new Response(JSON.stringify(user), {
    status: 200,
  });
};