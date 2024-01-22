// BookTypeという型を定義する
type BookType = {
  id: string;
  title: string;
  content: string;
  price: number;
  tumbnail: { url: string };
  createdAt: string;
  updatedAt: string;
};

type User = {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

type Purchase = {
  id: string;
  userId: string;
  bookId: string;
  createdAt: string;
  user: User;
};

// 他のファイルでも使用できるようにエクスポート
export type { BookType, User, Purchase };
