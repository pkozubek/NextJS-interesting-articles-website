import classNames from "classnames";
import useSWR from "swr";
import { fetcher } from "../utils/dataFetching";

type PagingProps = {
  currentPage: number;
};

function Paging({ currentPage }: PagingProps) {
  const { data } = useSWR<any>("articles/paging-info", fetcher);

  if (!data) return null;

  const renderedPages = [...Array(data.pages)].map((_val, index) => {
    const isActive = index + 1 === currentPage;

    return (
      <a
        key={`page-change-${index}`}
        href={`/articles/${index + 1}`}
        aria-current="page"
        className={classNames({
          "relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20":
            isActive,
          "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20":
            !isActive,
        })}
      >
        {index + 1}
      </a>
    );
  });

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <nav className="mx-auto isolate inline-flex -space-x-px rounded-md shadow-sm">
        {renderedPages}
      </nav>
    </div>
  );
}

export default Paging;
