"use client";

import Image from "next/image";
import Link from "next/link";
import { BookType } from "../types/type";
import { useReducer, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Bookコンポーネントのプロップスの型定義
type BookProps = {
  book: BookType;
};

// eslint-disable-next-line react/display-name

// Bookコンポーネントの実装
const Book = ({ book }: BookProps) => {
  // モーダルの表示状態を管理するState
  const [showModal, setShowModal] = useState(false);

  // useSessionフックを使用してユーザーセッションを取得
  const { data: session } = useSession();

  // 取得したユーザーセッションからユーザーオブジェクトを抽出
  // セッションオブジェクトに、userプロパティが存在する場合
  const user: any = session?.user;

  // useRouterを使用してルーターを取得
  const router = useRouter();

  console.log(user?.id);
  console.log(book.id);
  // 関数startCheckoutの定義
  const startCheckout = async () => {
    try {
      // チェックアウトを開始するための非同期処理

      // APIエンドポイントにリクエストを送信
      const response = await fetch(
        // チェックアウト用にapiエンドポイントURL
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          // POSTメソッドを使用してデータを送信
          method: "POST",
          // リクエストヘッダーに、JSONコンテンツを指定
          headers: { "Content-Type": "application/json" },
          // JSON形式で送信するデータ
          body: JSON.stringify({
            title: book.title,
            price: book.price,
            userId: user?.id,
            bookId: book.id,
          }),
        }
      );
      const responseData = await response.json();

      if (responseData) {
        router.push(responseData.checkout_url);
      }
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  // 購入ボタンがクリックされた時の処理
  const handlePurchaseClick = () => {
    setShowModal(true);
  };

  // キャンセルボタンがクリックされた時の処理
  const handleCancel = () => {
    setShowModal(false);
  };

  const handlePurchaseConfirm = () => {
    // ユーザーがログインしていない場合
    if (!user) {
      setShowModal(false);
      // ログインページへリダイレクト
      router.push("/login");
    } else {
      // Stripeで決済する
      startCheckout();
    }
  };

  return (
    <>
      {/* アニメーションスタイル */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .modal {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <div className="flex flex-col items-center m-4">
        <a
          onClick={handlePurchaseClick}
          className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
        >
          <Image
            priority
            src={book.tumbnail.url}
            alt={book.title}
            width={450}
            height={350}
            className="rounded-t-md"
          />
          <div className="px-4 py-4 bg-slate-100 rounded-b-md">
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="mt-2 text-lg text-slate-600">この本は○○...</p>
            <p className="mt-2 text-md text-slate-700">値段：{book.price}</p>
          </div>
        </a>

        {/* showModalがtrueの場合にのみ、レンダリング */}
        {showModal && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900 bg-opacity-50 flex justify-center items-center modal">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-xl mb-4">本を購入しますか？</h3>
              <button
                onClick={handlePurchaseConfirm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                購入する
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Book;
