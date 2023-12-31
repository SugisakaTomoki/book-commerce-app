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

    // Prismaを使用して購入履歴をデータベースに保存
    const purchase = await prisma.purchase.create({
      data: {
        userId: session.client_reference_id!,
        bookId: session.metadata?.bookId!,
      },
    });
    return NextResponse.json({ purchase });
  } catch (err) {
    return NextResponse.json(err);
  }
}
