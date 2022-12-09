import { useRouter } from "next/router";
import { IArticle } from "../../types/article";
import { getEndpointUrl } from "../../utils/dataFetching";
import ArticleItem from "../../components/ArticleItem";

type ArticlesPageProps = {
  articles: IArticle[];
};

function ArticlesPage({ articles }: ArticlesPageProps) {
  if (!articles) return null;

  const renderedArticles = articles.map((articleData) => (
    <ArticleItem {...articleData} />
  ));

  return (
    <div className="container mx-auto mt-4">
      <ul>{renderedArticles}</ul>
    </div>
  );
}

export async function getStaticProps(context: any) {
  try {
    const {
      params: { page },
    } = context;

    const articles = await fetch(
      `${getEndpointUrl()}/articles?page=${page - 1}`
    ).then((resp) => resp.json());

    if (articles.length === 0)
      return {
        notFound: true,
      };

    return {
      props: {
        articles,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  try {
    const { pages } = await fetch(
      `${getEndpointUrl()}/articles/paging-info`
    ).then((resp) => resp.json());

    return {
      paths: Array(pages).map((_val, index) => ({
        params: {
          page: index + 1,
        },
      })),
      fallback: true,
    };
  } catch {
    return {
      paths: [],
      fallback: true,
    };
  }
}

export default ArticlesPage;
