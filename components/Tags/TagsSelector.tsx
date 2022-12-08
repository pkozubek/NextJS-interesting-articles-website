import Tag from "./Tag";

type TagsSelectorProps = {
  tags: string[];
  selectedTags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
};

function TagsSelector({ selectedTags, setTags, tags }: TagsSelectorProps) {
  const onTagClick = (tagTitle: string) => {
    setTags((currentTags) => {
      if (currentTags.includes(tagTitle))
        return currentTags.filter((el) => el !== tagTitle);
      else return [...currentTags, tagTitle];
    });
  };

  const renderedTags = tags.map((tagTitle) => (
    <Tag
      isSelected={selectedTags.includes(tagTitle)}
      title={tagTitle}
      key={tagTitle}
      onClick={onTagClick.bind(null, tagTitle)}
    />
  ));

  return <ul className="flex my-2 ml-1 gap-x-2">{renderedTags}</ul>;
}

export default TagsSelector;
