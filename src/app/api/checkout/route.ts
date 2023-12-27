import { NextResponse } from "next/server";
import Stripe from "stripe";

// stripeApiと通信を行うためのStrippeインスタンスの作成
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// POSTメソッドのハンドラ関数
export async function POST(request: Request, response: Response) {
  // リクエストからJSONデータを解析して、titleとpriceを取得
  const { title, price, bookId, userId } = await request.json();
  console.log(title, price);

  try {
    // Stripe Checkoutセッションの作成
    const session = await stripe.checkout.sessions.create({
      // カードが利用可能な支払方法を指定
      payment_method_types: ["card"],
      //   メタデータの設定：本のIDをメタデータとして含める
      metadata: {
        bookId: bookId,
      },
      //   クライアント参照ID:ユーザーIDをクライアント参照IDとして指定
      client_reference_id: userId,
      //   購入アイテムの設定
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: {
              name: title,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/book/checkout-success?session_id={CHEKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:3000",
    });
    // sessionプロパティを持つオブジェクトを返す
    return NextResponse.json({ checkout_url: session.url });

    // nextjsのnextresponseクラスを使用して、JSON形式のエラーレスポンスをクライアントに返している
  } catch (err: any) {
    return NextResponse.json(err.message);
  }
}
