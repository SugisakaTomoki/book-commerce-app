// BookTypeという型を定義する
type BookType = {
  id: number;
  title: string;
  content: string;
  price: number;
  tumbnail: { url: string };
  createdAt: string;
  updatedAt: string;
};

// 他のファイルでも使用できるようにエクスポート
export type { BookType };
