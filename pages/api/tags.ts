import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //TODO: move this to collection
  const PREDEFINED_TAGS = ["Not defined", "Fun Fact", "Learn", "Inspiration"];

  switch (req.method) {
    case "GET":
      return res.status(200).json(PREDEFINED_TAGS);
    default:
      return res.status(404);
  }
}

export default handler;
