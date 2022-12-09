import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { createConnection } from "../../../utils/server";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const COLLECTION_NAME = "articles";

  switch (req.method) {
    case "GET":
      let mongoClient: MongoClient;

      try {
        mongoClient = await createConnection();
      } catch {
        res.status(500).json({
          message: "DB connection error",
        });
        return;
      }

      try {
        const collection = mongoClient.db().collection(COLLECTION_NAME);
        const result = await collection
          .find()
          .sort({ createdAt: -1 })
          .limit(3)
          .toArray();

        return res.status(201).json(result);
      } catch {
        res.status(500).json({
          message: "Data not inserted, something went wrong",
        });
        return;
      }
  }
}

export default handler;
