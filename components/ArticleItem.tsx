import Image from "next/image";
import Link from "next/link";
import { IArticle } from "../types/article";
import { formatDate } from "../utils/date";
import Tags from "./Tags";

function ArticlePreviewItem({
  createdAt,
  description,
  tags,
  title,
  articleImage,
  _id,
}: IArticle) {
  return (
    <Link href={`/article/${_id}`}>
      <li className="my-2 flex border shadow">
        <figure className="w-2/5 md:w-1/5 h-64">
          <Image
            src={articleImage}
            alt={`${title}-image`}
            width={600}
            height={600}
            className="h-full w-full"
          />
        </figure>
        <div className="w-3/5 md:w-4/5 p-4">
          <h2 className="text-lg">{title}</h2>
          <time className="text-slate-500">{formatDate(createdAt)}</time>
          <div className="mt-2">
            <Tags tags={tags} />
          </div>
          <div className="my-4 text-slate-800 pr-2">{description}</div>
        </div>
      </li>
    </Link>
  );
}

export default ArticlePreviewItem;
