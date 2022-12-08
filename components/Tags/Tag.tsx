import classNames from "classnames";

type TagProps = {
  title: string;
  isSelected: boolean;
  onClick?: () => void;
};

function Tag({ title, isSelected, onClick }: TagProps) {
  return (
    <li
      onClick={onClick}
      className={classNames(
        "p-2 rounded-lg text-black text-gray-900 hover:text-sky-600",
        {
          "bg-sky-600	text-white hover:text-slate-50": isSelected,
        }
      )}
    >
      {title}
    </li>
  );
}

export default Tag;
