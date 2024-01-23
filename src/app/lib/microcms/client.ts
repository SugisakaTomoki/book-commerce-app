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

  console.log(allBooks);
  //   取得した本のリストを返す
  return allBooks;
};

// この関数は、指定されたコンテンツIDに基づいて、MicroCMSから詳細な書籍情報を取得するためのもの
export const getDetailBook = async (contentId: string) => {
  // MicroCMSのクライアント（APIを操作するためのクライアント）を使用して、指定されたエンドポイント（"ebook"）の詳細な書籍情報を取得します。
  const detailBook = await client.getListDetail<BookType>({
    // MicroCmsのエンドポイント名
    endpoint: "bookcommerce",
    // 取得したい書籍のコンテンツID
    contentId,
  });
  // 取得した詳細な書籍情報を呼び出しもとに返す
  return detailBook;
};
