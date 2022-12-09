import Image from "next/image";
import ImageSelectorModal from "./ImageSelectorModal";
import StyledInput from "./StyledInput";
import { Dispatch, SetStateAction } from "react";

export type ImageSelectorProps = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedImageUrl: string;
  setSelectedImageUrl: Dispatch<SetStateAction<string>>;
};

function ImageSelector({
  isOpen,
  selectedImageUrl,
  setOpen,
  setSelectedImageUrl,
}: ImageSelectorProps) {
  const onChangeClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    setOpen(true);
  };

  return (
    <StyledInput label="Article Image" inputType="custom">
      <div className="flex">
        <button className="border p-2 rounded" onClick={onChangeClick}>
          Change Article Image
        </button>
        <Image
          src={selectedImageUrl}
          alt="selected-img-preview"
          className="h-16 w-16 rounded"
          width={100}
          height={100}
        />
      </div>
      <ImageSelectorModal
        isOpen={isOpen}
        selectedImageUrl={selectedImageUrl}
        setOpen={setOpen}
        setSelectedImageUrl={setSelectedImageUrl}
      />
    </StyledInput>
  );
}

export default ImageSelector;
