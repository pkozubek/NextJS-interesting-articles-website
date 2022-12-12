import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { getEndpointUrl } from "../../utils/dataFetching";
import StyledInput from "../Form/StyledInput";
import toast from "../../components/Toast";
import { ToastType } from "../../types/toast";
import { useSWRConfig } from "swr";
import ContentGuard from "../ContentGuard";
import { useSession } from "next-auth/react";

type ArticleCommentFormProps = {
  articleId: string;
};

function ArticleCommentForm({ articleId }: ArticleCommentFormProps) {
  const [comment, setComment] = useState("");
  const { mutate } = useSWRConfig();

  const { data } = useSession();

  const onCommentChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(ev.target.value);
  };

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    fetch(`${getEndpointUrl()}/articles/${articleId}/comments`, {
      method: "POST",
      body: JSON.stringify({
        name: data?.user?.email,
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
      });
  };

  const canSubmit = !!comment;

  return (
    <ContentGuard>
      <>
        <h3 className="mt-4 border-b-2 pb-1 border-sky-700">Add comment</h3>
        <form className="w-4/5 mx-auto pt-4" onSubmit={onSubmit}>
          <textarea
            className="shadow border rounded focus:outline-none focus:shadow-outline w-full p-2 resize-none"
            value={comment}
            onChange={onCommentChange}
          />
          <div className="w-full py-4 flex justify-end">
            <button
              className="mt-4 btn btn-submit sm:mr-2"
              disabled={!canSubmit}
            >
              Add comment
            </button>
          </div>
        </form>
      </>
    </ContentGuard>
  );
}

export default ArticleCommentForm;
