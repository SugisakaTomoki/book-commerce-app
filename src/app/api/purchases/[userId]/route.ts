import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// 購入履歴検索API
export async function GET(
  // GETリクエストを処理するための関数
  request: Request,
  //   パスパラメータからuserIdを抽出
  { params }: { params: { userId: string } }
) {
  // パスパラメータからuserIdを取得
  const userId = params.userId;
  try {
    // Prismaを使用してデータベースからuserIdに基づいて購入履歴を取得
    const purchase = await prisma.purchase.findMany({
      where: { userId: userId },
    });
    console.log(purchase);
    // 購入履歴をJSON形式でレスポンス
    return NextResponse.json(purchase);
    // エラーが発生した場合、エラーメッセージをJSON形式でレスポンス
  } catch (err) {
    return NextResponse.json(err);
  }
}
