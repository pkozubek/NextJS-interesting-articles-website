import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import ArticleContent from "../../components/Article/ArticleContent";

import ImageSelector from "../../components/Form/ImageSelector";
import StyledInput from "../../components/Form/StyledInput";
import RedirectGuard from "../../components/RedirectGuard";
import TagsSelector from "../../components/Tags/TagsSelector";
import toast from "../../components/Toast";
import { IArticleDTO } from "../../types/article";
import { ToastType } from "../../types/toast";
import { getEndpointUrl } from "../../utils/dataFetching";
import { images } from "../../utils/images";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

type AddArticleProps = {
  tags: string[];
};

function AddArticle({ tags }: AddArticleProps) {
  const { push } = useRouter();

  const [markdownValue, setMarkdownValue] = useState("");
  const [selectedTags, setSelectedTags] = useState([tags[0]]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState(images[0].src);
  const [imageSelectorOpen, setImageSelectorOpen] = useState(false);

  const formRef = useRef<null | HTMLFormElement>(null);

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const bodyObj: IArticleDTO = {
      title,
      description,
      content: markdownValue,
      tags: selectedTags,
      articleImage: selectedImageUrl,
    };

    fetch(`${getEndpointUrl()}/articles`, {
      method: "POST",
      body: JSON.stringify(bodyObj),
    })
      .then((resp) => resp.json())
      .then((jsonResp) => {
        toast({
          message: jsonResp.message,
          type: jsonResp.article ? ToastType.SUCCESS : ToastType.ERROR,
        });

        push("/");
      })
      .catch(() => {
        toast({ message: "Something went wrong", type: ToastType.ERROR });
      });
  };

  const onBtnClick = () => {
    if (formRef.current) formRef.current.requestSubmit();
  };

  const isBtnDisabled = useMemo(() => {
    return !(
      [title, description, markdownValue].every((val) => !!val) &&
      selectedTags.length > 0
    );
  }, [formRef, title, description, markdownValue, selectedTags]);

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);

  return (
    <RedirectGuard redirectUrl="/auth">
      <div>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
          <form
            ref={formRef}
            data-color-mode="light"
            onSubmit={onSubmit}
            className="shadow-md border w-full p-2"
          >
            <StyledInput
              name="title"
              type="text"
              label="Title"
              inputType="input"
              value={title}
              onChange={onTitleChange}
            />
            <StyledInput label="Tags" inputType="custom">
              <TagsSelector
                selectedTags={selectedTags}
                setTags={setSelectedTags}
                tags={tags}
              />
            </StyledInput>
            <StyledInput
              name="description"
              type="textarea"
              label="Description"
              inputType="textarea"
              onChange={onDescriptionChange}
            />
            <ImageSelector
              isOpen={imageSelectorOpen}
              setOpen={setImageSelectorOpen}
              selectedImageUrl={selectedImageUrl}
              setSelectedImageUrl={setSelectedImageUrl}
            />
            <StyledInput label="Content" inputType="custom">
              <MarkdownEditor
                value={markdownValue}
                onChange={setMarkdownValue}
              />
            </StyledInput>
          </form>
          <div className="shadow-md p-4 border">
            <h2>Article Preview</h2>
            <ArticleContent content={markdownValue} />
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button
            onClick={onBtnClick}
            type="submit"
            className="mt-4 btn btn-submit mr-2"
            disabled={isBtnDisabled}
          >
            Add article
          </button>
        </div>
      </div>
    </RedirectGuard>
  );
}

export async function getStaticProps() {
  try {
    const tags = await fetch(`${getEndpointUrl()}/tags`).then((resp) =>
      resp.json()
    );

    return {
      props: {
        tags,
      },
    };
  } catch {
    return {
      props: {
        tags: ["Not Defined"],
      },
    };
  }
}

export default AddArticle;
