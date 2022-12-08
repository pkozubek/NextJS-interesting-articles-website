import Link from "next/link";
import ArticleItem from "../components/ArticleItem";
import { IArticle } from "../types/article";
import { getEndpointUrl } from "../utils/dataFetching";

type HomeProps = {
  recentArticles: IArticle[];
};

function Home({ recentArticles }: HomeProps) {
  if (!recentArticles) {
    return (
      <div>
        No articles... maybe you want to add one?
        <Link href="/add">Add new article</Link>
      </div>
    );
  }

  const renderedArticles = recentArticles.map((articleData) => (
    <ArticleItem {...articleData} />
  ));

  return <ul>{renderedArticles}</ul>;
}

export async function getStaticProps() {
  return {
    props: {
      recentArticles: [],
    },
  };
  // try {
  //   const recentArticles = await fetch(
  //     `${getEndpointUrl()}/articles/recent`
  //   ).then((resp) => resp.json());

  //   return {
  //     props: {
  //       recentArticles,
  //     },
  //   };
  // } catch (e) {
  //   return { notFound: true };
  // }
}

export default Home;
