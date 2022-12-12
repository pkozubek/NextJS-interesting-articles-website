import { useMemo } from "react";
import useSWR from "swr";
import { IArticleComment } from "../../types/article";
import { fetcher } from "../../utils/dataFetching";
import { formatDate } from "../../utils/date";

type ArticleCommentsProps = {
  articleId: string;
};

function ArticleComments({ articleId }: ArticleCommentsProps) {
  const { data: commentsData, isLoading } = useSWR<IArticleComment[]>(
    `/articles/${articleId}/comments`,
    fetcher
  );

  const renderedMessages = useMemo(() => {
    if (commentsData && commentsData.length > 0) {
      const comments = commentsData.map((commentData) => (
        <li className="border shadow rounded mb-2 p-4 w-4/5 mx-auto">
          <div>{commentData.comment}</div>
          <div className="flex justify-between mt-4">
            <div className="text-gray-900">{commentData.name}</div>
            <time className="text-gray-900">
              {formatDate(commentData.createdAt)}
            </time>
          </div>
        </li>
      ));

      return <ul>{comments}</ul>;
    }

    return null;
  }, [commentsData]);

  return (
    <div>
      {isLoading ||
        (commentsData && commentsData.length > 0 && (
          <h3 className="border-b-2 border-sky-700 mb-8">Comments</h3>
        ))}
      {isLoading && <p>Loading...</p>}
      {renderedMessages}
    </div>
  );
}

export default ArticleComments;
