import { getArticleById } from "./boutiqueId.query";

export default async function Page({
  params: { id },
}: {
  params: { id: number };
}) {
  const article = await getArticleById(id);

  console.log(article);
  return <div>page</div>;
}
