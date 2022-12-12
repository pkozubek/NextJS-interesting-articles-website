import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { createConnection } from "../../../../utils/server";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const COLLECTION_NAME = "comments";
  const ARTICLE_COLLECTION_NAME = "articles";

  let mongoClient: MongoClient;

  if (req.method === "POST") {
    const { id: articleId } = req.query;
    const { comment, name } = JSON.parse(req.body);

    try {
      mongoClient = await createConnection();
    } catch {
      res.status(500).json({
        message: "DB connection error",
      });
      return;
    }

    try {
      const db = mongoClient.db();

      const articleCollection = db.collection(ARTICLE_COLLECTION_NAME);

      const article = await articleCollection.findOne({
        _id: new ObjectId(articleId as string),
      });

      if (!article)
        return res.status(400).json({
          message: "Article with this id does not exist",
        });

      if (!comment || !name) {
        return res.status(400).json({
          message: "Comment or name cannot be empty",
        });
      }

      try {
        const result = await db.collection(COLLECTION_NAME).insertOne({
          articleId,
          name,
          comment,
          createdAt: new Date().toISOString(),
        });

        return res.status(201).json({
          message: "Comment added successfully",
          comment: {
            comment,
            id: result.insertedId,
          },
        });
      } catch {
        res.status(500).json({
          message: "Data not inserted, something went wrong",
        });
      }
    } catch {
      return res.status(500).json({
        message: "Data not inserted, something went wrong",
      });
    }
  } else if (req.method === "GET") {
    const { id: articleId } = req.query;

    try {
      mongoClient = await createConnection();
    } catch {
      res.status(500).json({
        message: "DB connection error",
      });
      return;
    }

    try {
      const db = mongoClient.db();

      const result = await db
        .collection(COLLECTION_NAME)
        .find({
          articleId,
        })
        .toArray();

      console.log("In get", result);

      res.status(200).json(result);
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
