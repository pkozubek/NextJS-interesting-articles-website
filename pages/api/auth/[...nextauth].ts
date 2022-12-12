import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../utils/auth";
import { createConnection } from "../../../utils/server";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const mongoClient = await createConnection();

        const userCollection = mongoClient.db().collection("users");

        const user = await userCollection.findOne({
          email: credentials?.email,
        });

        if (!user) {
          mongoClient.close();
          throw new Error("User does not exits");
        }

        const isValidPassword = await verifyPassword(
          credentials?.password ?? "",
          user.password
        );

        if (!isValidPassword) {
          mongoClient.close();
          throw new Error("Wrong email password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
