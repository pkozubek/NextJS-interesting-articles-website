import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { createConnection } from "../../../utils/server";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const COLLECTION_NAME = "articles";

  let mongoClient: MongoClient;
  if (req.method === "GET") {
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
      const result = await collection.countDocuments();

      const pages = Math.ceil(result / parseInt(process.env.PAGE_SIZE || ""));

      res.status(200).json({
        pages,
      });
    } catch {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  } else {
    return res.status(404);
  }
}

export default handler;
