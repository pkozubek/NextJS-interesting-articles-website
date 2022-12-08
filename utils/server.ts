import { MongoClient } from "mongodb";

export async function createConnection() {
  return await MongoClient.connect(process.env.CONNECTION_STRING || "");
}

export function isCorrectString(val: string) {
  return !!val && val != "";
}
