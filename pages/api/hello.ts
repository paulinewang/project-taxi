// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import "firebase/compat/auth";
import admin from "firebase-admin";
import key from "./../../project-taxi-8a2bf-firebase-adminsdk-e6ic2-d08ff9936f.json";

type Data = {
  name: string;
};

const withPrivateKey = {
  ...key,
  private_key: process.env.firebase_admin_private_key,
} as admin.ServiceAccount;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(withPrivateKey),
    databaseURL:
      "https://project-taxi-8a2bf-default-rtdb.europe-west1.firebasedatabase.app",
  });
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const auth = admin.auth();

  auth
    .listUsers()
    .then((userRecords) => {
      userRecords.users.forEach((user) => console.log(user.toJSON()));
      res.end("Success!");
    })
    .catch((error) => console.log(error));
}
