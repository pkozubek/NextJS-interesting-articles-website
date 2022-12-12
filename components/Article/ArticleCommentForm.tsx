import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { getEndpointUrl } from "../../utils/dataFetching";
import StyledInput from "../Form/StyledInput";
import toast from "../../components/Toast";
import { ToastType } from "../../types/toast";
import { useSWRConfig } from "swr";

type ArticleCommentFormProps = {
  articleId: string;
};

function ArticleCommentForm({ articleId }: ArticleCommentFormProps) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const { mutate } = useSWRConfig();

  const onNameChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setName(ev.target.value);
  };

  const onCommentChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(ev.target.value);
  };

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    fetch(`${getEndpointUrl()}/articles/${articleId}/comments`, {
      method: "POST",
      body: JSON.stringify({
        name,
        comment,
      }),
    })
      .then((resp) => resp.json())
      .then((jsonResp) => {
        toast({
          message: jsonResp.message,
          type: jsonResp.comment ? ToastType.SUCCESS : ToastType.ERROR,
        });

        mutate(`/articles/${articleId}/comments`);
      })
      .catch(() => {
        toast({ message: "Something went wrong", type: ToastType.ERROR });
      })
      .finally(() => {
        setComment("");
        setName("");
      });
  };

  const canSubmit = !!name && !!comment;

  return (
    <>
      <h3 className="mt-4 border-b-2 pb-1 border-sky-700">Add comment</h3>
      <form className="w-4/5 mx-auto pt-4" onSubmit={onSubmit}>
        <StyledInput
          onChange={onNameChange}
          inputType="input"
          label="Your name"
          className="sm:w-full md:w-full"
          value={name}
        />
        <StyledInput
          onChange={onCommentChange}
          inputType="textarea"
          label="Comment"
          className="sm:w-full md:w-full"
          value={comment}
        />
        <div className="w-full py-4 flex justify-end">
          <button className="mt-4 btn btn-submit sm:mr-2" disabled={!canSubmit}>
            Add comment
          </button>
        </div>
      </form>
    </>
  );
}

export default ArticleCommentForm;
