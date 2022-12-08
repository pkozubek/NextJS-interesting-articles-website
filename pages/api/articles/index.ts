import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { IArticle, IArticleDTO } from "../../../types/article";
import { createConnection, isCorrectString } from "../../../utils/server";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const COLLECTION_NAME = "articles";

  switch (req.method) {
    case "POST":
      const { title, description, content, tags } = req.body;

      if (
        [title, description, content].every((val) => !!val) &&
        tags &&
        tags.length > 0
      ) {
        return res.status(400).json({
          message: "Wrong body data",
        });
      }

      const articleData: IArticleDTO = {
        title,
        description,
        content,
        tags,
      };

      let mongoClient: MongoClient;
      let insertedArticle: IArticle;

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
        const result = await collection.insertOne(articleData);

        insertedArticle = {
          ...articleData,
          id: result.insertedId.toString(),
        };
      } catch {
        res.status(500).json({
          message: "Data not inserted, something went wrong",
        });
        return;
      }
      return res.status(201).json({
        article: insertedArticle,
        message: "Article added successfully",
      });
    case "GET":
      try {
      } catch {}

      return res.status(201).json({
        article: insertedArticle,
        message: "Article added successfully",
      });
  }

  return res.status(404);
}

export default handler;
