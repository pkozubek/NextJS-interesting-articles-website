import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { IArticle, IArticleToInsert } from "../../../types/article";
import { createConnection } from "../../../utils/server";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const COLLECTION_NAME = "articles";

  switch (req.method) {
    case "POST":
      const { title, description, content, tags, articleImage } = JSON.parse(
        req.body
      );

      const session = await unstable_getServerSession(req, res, authOptions);
      if (!session) {
        return res.status(401).json({
          message: "Not authenticated",
        });
      }

      if (
        [title, description, content, articleImage].some((val) => !val) ||
        !tags ||
        tags.length <= 0
      ) {
        return res.status(400).json({
          message: "Wrong body data",
        });
      }

      const articleData: IArticleToInsert = {
        title,
        description,
        content,
        tags,
        createdAt: new Date().toISOString(),
        articleImage,
      };

      let postMongoClient: MongoClient;
      let insertedArticle: IArticle;

      try {
        postMongoClient = await createConnection();
      } catch {
        res.status(500).json({
          message: "DB connection error",
        });
        return;
      }

      try {
        const collection = postMongoClient.db().collection(COLLECTION_NAME);
        const result = await collection.insertOne(articleData);

        insertedArticle = {
          ...articleData,
          _id: result.insertedId.toString(),
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
      const { page } = req.query;
      const pageNumber = !page ? 0 : parseInt(page as string);
      const pageSize = parseInt(process.env.PAGE_SIZE as string);

      let getMongoClient: MongoClient;
      try {
        getMongoClient = await createConnection();
      } catch {
        res.status(500).json({
          message: "DB connection error",
        });
        return;
      }

      try {
        const collection = getMongoClient.db().collection(COLLECTION_NAME);
        const result = await collection
          .find()
          .skip(pageNumber * pageSize)
          .limit(pageSize)
          .toArray();

        return res.status(200).json(result);
      } catch {
        res.status(500).json({
          message: "Data not inserted, something went wrong",
        });
        return;
      }
  }

  return res.status(404);
}

export default handler;
