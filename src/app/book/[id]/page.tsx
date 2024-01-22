import { getDetailBook } from "@/app/lib/microcms/client";
import Image from "next/image";
import React from "react";

// DetailBookコンポーネントの定義
// 引数としてparamsを受け取る。paramsはオブジェクト型で、その中にidという文字列型のデータがある
const DetailBook = async ({ params }: { params: { id: string } }) => {
  // パラメータから本のIDを取得し、MicroCMSから詳細な本の情報を非同期で取得
  const book = await getDetailBook(params.id);
  // console.log(book);

  return (
    <div className="container mx-auto p-4">
      {/* 本の詳細を表示するためのコンテナ */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* 本の画像を表示するImageコンポーネント */}
        <Image
          src={book.tumbnail.url}
          alt={book.title}
          className="mx-auto h-80 object-cover object-center "
          width={700}
          height={700}
        />
        {/* 本の詳細情報を表示するためのコンテナ */}
        <div className="p-4">
          {/* 本のタイトルを表示する見出し */}
          <h2 className="text-2xl font-bold">{book.title}</h2>
          <div
            className="text-gray-700 mt-2"
            dangerouslySetInnerHTML={{ __html: book.content }}
          />

          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              公開日:{new Date(book.publishedAt as any).toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">
              最終更新:{new Date(book.updatedAt as any).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBook;
