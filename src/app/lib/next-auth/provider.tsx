"use client";

import { SessionProvider } from "next-auth/react";
import { FC, PropsWithChildren } from "react";

// NextAuthのセッションプロバイダーをラップした独自のReactコンポーネント

// FC<PropsWithChildren>は、React関数コンポーネントの型定義で、
// PropsWithChildrenは子要素を含むPropsを指定するための型

// NextAuthのセッションプロバイダーでラップされた子要素を返す関数コンポーネント
export const NextAuthProvider: FC<PropsWithChildren> = ({ children }) => {
  // SessionProviderはNextAuthの提供するReactコンポーネントで、
  // 認証関連のセッション情報を提供するためのコンポーネント

  // childrenはこのコンポーネントの子要素を指すPropsの一部であり、
  // このコンポーネントでラップされたものがSessionProviderに渡される
  return <SessionProvider>{children}</SessionProvider>;
};
