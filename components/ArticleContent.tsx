import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";
import { ReactNode } from "react-markdown/lib/react-markdown";

type ArticleContentProps = {
  content: string;
};

function ArticleContent({ content }: ArticleContentProps) {
  const customComponents: Partial<
    Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
  > = {
    img: (img) => {
      return (
        <Image
          src={img.src || ""}
          alt={img.alt || ""}
          height={300}
          width={500}
        />
      );
    },
    p: (paragraph) => {
      const jsxElements: ReactNode[] = [];

      //any because children nodes are poorly typed
      paragraph.children.forEach((children: any) => {
        if (children.tagName === "img") {
          jsxElements.push(
            <div>
              <Image
                src={children.properties.src}
                alt={children.alt}
                width={600}
                height={300}
              />
            </div>
          );
        }

        jsxElements.push(<p>{children}</p>);
      });

      return <div className="mt-2">{jsxElements}</div>;
    },
    u: (underlineProps) => {
      return (
        <p className="underline underline-offset-8	">
          {underlineProps.children}
        </p>
      );
    },
  };

  return (
    <ReactMarkdown className="article-content" components={customComponents}>
      {content}
    </ReactMarkdown>
  );
}

export default ArticleContent;
