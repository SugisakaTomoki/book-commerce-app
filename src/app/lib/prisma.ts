// Prismaクライアントをインポート
import { PrismaClient } from "@prisma/client";

// グローバル変数Prismaを宣言
let prisma: PrismaClient;

// Prismaクライアントのインスタンスをグローバルスコープで共有するためのグローバル変数を取得
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// グローバル変数のPrismaクライアントが未定義の場合
if (!globalForPrisma.prisma) {
  // 新しいPrismaクライアントのインスタンスを作成し、グローバル変数に保存
  globalForPrisma.prisma = new PrismaClient();
}

// グローバル変数に保存されたPrismaクライアントを取得
prisma = globalForPrisma.prisma;

// 他のファイルでPrismaクライアントを使用できるようにエクスポート
export default prisma;
