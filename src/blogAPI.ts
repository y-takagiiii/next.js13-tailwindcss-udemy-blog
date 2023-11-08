import { notFound } from "next/navigation";
import { Article } from "./types";

// SSRで全ての記事データを取得する
// 13以降getServerSidePropsではなく、下記の書き方になる
// 故ロケーションの観点からexportせずに、Reactコンポーネント内に記述するのが方が良さそう
export const getAllArticles = async (): Promise<Article[]> => {
  const res = await fetch(`http://localhost:3002/posts`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }
  // suspenseを実装するためにSSRのタイミングをあえてずらす
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const articles = await res.json();
  return articles;
};

// 記事詳細は頻繁に更新されるわけではないのでISR(もしくはSG)
export const getDetailArticle = async (id: string): Promise<Article> => {
  const res = await fetch(`http://localhost:3002/posts/${id}`, { next: { revalidate: 60 } });
  if (res.status === 404) {
    notFound();
  }
  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const article = await res.json();
  return article;
};

export const createArticle = async (
  id: string,
  title: string,
  content: string
): Promise<Article> => {
  const currentDateTime = new Date().toISOString();
  const res = await fetch(
    'http://localhost:3002/posts',
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, content, createdAt: currentDateTime })
    }
  );
  if (!res.ok) {
    throw new Error("記事を作成できませんでした。");
  }
  const newArticle = await res.json();
  return newArticle;
};