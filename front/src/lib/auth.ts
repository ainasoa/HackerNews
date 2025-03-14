import axios from "axios";
/* eslint-disable @typescript-eslint/no-explicit-any */

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MY_API,
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize({ email, password }): Promise<any> {
        try {
          const { data } = await axiosInstance.post("/login", {
            email,
            password,
          });

          return data;
        } catch (error: any) {
          console.log(error);

          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }) =>
      user || token ? { ...user, ...token } : null,
    session: async ({ session, token }) => ({ ...session, user: token as any }),
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
