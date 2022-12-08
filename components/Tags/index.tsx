import Tag from "./Tag";

type TagsProps = {
  tags: string[];
};

function Tags({ tags }: TagsProps) {
  return (
    <ul>
      {tags.map((tagTitle) => (
        <Tag key={tagTitle} isSelected={true} title={tagTitle} />
      ))}
    </ul>
  );
}

export default Tags;
