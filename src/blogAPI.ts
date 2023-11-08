import { Article } from "./types";

// SSRで全ての記事データを取得する
// 13以降getServerSidePropsではなく、下記の書き方になる
// 故ロケーションの観点からexportせずに、Reactコンポーネント内に記述するのが方が良さそう
export const getAllArticles = async (): Promise<Article[]> => {
  const res = await fetch(`http://localhost:3002/posts`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }
  const articles = await res.json();
  return articles;
};