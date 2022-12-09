import Tag from "./Tag";

type TagsProps = {
  tags: string[];
};

function Tags({ tags }: TagsProps) {
  return (
    <ul className="flex my-2 gap-x-2">
      {tags.map((tagTitle) => (
        <Tag key={tagTitle} isSelected={true} title={tagTitle} />
      ))}
    </ul>
  );
}

export default Tags;
