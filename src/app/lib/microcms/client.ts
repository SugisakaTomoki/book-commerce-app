// microCMSのJavascript SDKからcreateClient関数をインポート
import { BookType } from "@/app/types/type";
import { createClient } from "microcms-js-sdk";

// microCMSに接続するためのクライアントを生成し、エクスポート
export const client = createClient({
  // サービスのドメインを環境変数から取得
  serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN!,
  //   APIキーを環境変数から取得
  apiKey: process.env.NEXT_PUBLIC_API_KEY!,
});

// 全ての本を取得する関数を定義
export const getAllBooks = async () => {
  // microCMSのエンドポイント"bookcommerce"から本のリストを取得
  const allBooks = await client.getList<BookType>({
    endpoint: "bookcommerce",
  });
  //   取得した本のリストを返す
  return allBooks;
};
