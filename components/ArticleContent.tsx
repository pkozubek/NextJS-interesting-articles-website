import ReactMarkdown from "react-markdown";

type ArticleContentProps = {
  content: string;
};

function ArticleContent({ content }: ArticleContentProps) {
  return <ReactMarkdown>{content}</ReactMarkdown>;
}

export default ArticleContent;
