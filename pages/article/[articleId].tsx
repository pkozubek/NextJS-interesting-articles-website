import Image from "next/image";
import ArticleContent from "../../components/ArticleContent";
import Tags from "../../components/Tags";
import { IArticle } from "../../types/article";
import { getEndpointUrl } from "../../utils/dataFetching";
import { formatDate } from "../../utils/date";

type ArticleDetailsProps = {
  articleData: IArticle;
};

function ArticleDetails({ articleData }: ArticleDetailsProps) {
  if (!articleData) return null;

  return (
    <div className="w-full">
      <div className="flex w-full pb-8 border-b-2 border-sky-700 mb-4">
        <Image
          src={articleData.articleImage}
          alt="article-image"
          width={300}
          height={300}
        />
        <div className="pl-8">
          <h2 className="text-2xl">{articleData.title}</h2>
          <Tags tags={articleData.tags} />
          <time>{formatDate(articleData.createdAt)}</time>
        </div>
      </div>
      <ArticleContent content={articleData.content} />
    </div>
  );
}

export async function getStaticProps(context: any) {
  try {
    const {
      params: { articleId },
    } = context;

    const articleData = await fetch(
      `${getEndpointUrl()}/articles/${articleId}`
    ).then((resp) => resp.json());

    return {
      props: {
        articleData,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default ArticleDetails;
