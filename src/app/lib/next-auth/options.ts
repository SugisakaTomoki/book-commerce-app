// NextAuth.jsの認証ライブラリである、"next-auth"を使用してgithubのauth認証を組み込む為の設定ファイル

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import prisma from "../prisma";

// NextAuthOptions型のオブジェクトを作成
export const nextAuthOptions: NextAuthOptions = {
  // デバッグモードを有効化
  debug: false,

  //   認証プロバイダーの設定
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  //   Prismaを使用したデータベースアダプターの設定
  adapter: PrismaAdapter(prisma),

  //   コールバック関数の設定
  callbacks: {
    // セッション生成時のコールバック
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
