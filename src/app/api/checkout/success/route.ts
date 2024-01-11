import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Stripeインスタンスの作成
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// 購入履歴の保存
export async function POST(request: Request, response: Response) {
  // リクエストからセッションIDを取得
  const { sessionId } = await request.json();

  try {
    // Stripe Checkoutセッションの取得
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // 既存の購入履歴の検索
    // Prisma の findFirst メソッドを使用して、purchase モデルからデータを検索
    // このメソッドは条件に一致する最初のレコードを取得
    // where: { ... }: 検索条件を指定するためのオプション
    // const existingPurchase = prisma.purchase.findFirst({
    //   where: {
    //     // ユーザーIDに基づいて検索
    //     userId: session.client_reference_id,
    //     // 本のIDに基づいて検索(メタデータを使用)
    //     bookId: session.metadata?.bookId!,
    //   },
    // });

    // 既存の購入履歴が存在しない場合
    if (true) {
      // Prismaを使用して購入履歴をデータベースに保存
      const purchase = await prisma.purchase.create({
        data: {
          userId: session.client_reference_id!,
          bookId: session.metadata?.bookId!,
        },
      });
      return NextResponse.json({ purchase });
    } else {
      // 既に購入済みの場合
      return NextResponse.json({ message: "既に購入済みです" });
    }
  } catch (err) {
    return NextResponse.json(err);
  }
}
