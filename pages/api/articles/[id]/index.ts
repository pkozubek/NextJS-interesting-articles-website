import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { createConnection } from "../../../../utils/server";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const COLLECTION_NAME = "articles";

  if (req.method === "GET") {
    let mongoClient: MongoClient;
    const { id } = req.query;

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
      const result = await collection.findOne({
        _id: new ObjectId(id as string),
      });

      return res.status(201).json(result);
    } catch {
      res.status(500).json({
        message: "Data not inserted, something went wrong",
      });
      return;
    }
  } else {
    return res.status(404);
  }
}

export default handler;
