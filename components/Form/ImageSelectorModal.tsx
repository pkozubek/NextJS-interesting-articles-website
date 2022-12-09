import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import { AiFillCheckCircle } from "react-icons/ai";
import { images } from "../../utils/images";
import { ImageSelectorProps } from "./ImageSelector";

function ImageSelectorModal({
  isOpen,
  setOpen,
  selectedImageUrl,
  setSelectedImageUrl,
}: ImageSelectorProps) {
  const cancelButtonRef = useRef(null);

  const onImageClick = (imgUrl: string) => setSelectedImageUrl(imgUrl);

  if (typeof document === "undefined") return null;

  const renderedImages = useMemo(() => {
    return images.map((imgProps) => {
      const isSelected = imgProps.src === selectedImageUrl;

      return (
        <div className="relative w-full">
          <Image
            {...imgProps}
            width={300}
            height={300}
            className="object-fill h-64 w-full"
            onClick={onImageClick.bind(null, imgProps.src)}
          />
          {isSelected && (
            <div className="absolute bottom-2 right-2 ">
              <AiFillCheckCircle className="fill-emerald-400" size={20} />
            </div>
          )}
        </div>
      );
    });
  }, [selectedImageUrl]);

  return ReactDOM.createPortal(
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 pb-2"
                      >
                        Pick Article Image
                      </Dialog.Title>
                      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2	">
                        {renderedImages}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 pb-4 pt-1 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>,
    document.getElementById("modal_root") as HTMLElement
  );
}

export default ImageSelectorModal;
