import Image from "next/image";
import { formatDate } from "../utils/date";

type ArticleItemProps = {
  title: string;
  imageUrl: string;
  description: string;
  tags: string[];
  linkToArticle: string;
  createdAt: string;
  authorName: string;
};

function ArticleItem({
  createdAt,
  description,
  imageUrl,
  linkToArticle,
  tags,
  title,
  authorName,
}: ArticleItemProps) {
  const renderedTags = tags.map((tag) => <li className="shadow-md">{tag}</li>);

  return (
    <li>
      <figure>
        <Image src={imageUrl} alt={`${title}-image`} />
      </figure>
      <div>
        <h2>{title}</h2>
        <div className="flex justify-between	">
          <time>{formatDate(createdAt)}</time>
          <div>{authorName}</div>
        </div>
        <ul>{renderedTags}</ul>
        <div>{description}</div>
        <a href={linkToArticle}></a>
      </div>
    </li>
  );
}

export default ArticleItem;
