import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword, isEmailValid } from "../../../utils/auth";
import { createConnection } from "../../../utils/server";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const COLLECTION_NAME = "users";

  let mongoClient: MongoClient;

  if (req.method === "POST") {
    try {
      mongoClient = await createConnection();
    } catch {
      res.status(500).json({
        message: "DB connection error",
      });
      return;
    }

    const { email, password } = JSON.parse(req.body);

    if (!isEmailValid(email) || !password)
      return res.status(400).json({
        message: "Wrong body data",
      });

    try {
      const collection = mongoClient.db().collection(COLLECTION_NAME);

      const existingUser = await collection.findOne({
        email,
      });

      if (!!existingUser)
        return res.status(400).json({
          message: "User with that email already exists",
        });

      const hashedPassword = await hashPassword(password);

      await collection.insertOne({
        email,
        password: hashedPassword,
      });

      return res
        .status(200)
        .json({ message: "successfully registered", isOk: true });
    } catch {
      res.status(500).json({
        message: "Data not inserted, something went wrong",
      });
      return;
    }
  } else return res.status(404);
}

export default handler;
