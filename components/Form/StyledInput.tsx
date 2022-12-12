import { InputHTMLAttributes, ReactNode, useMemo } from "react";
import classNames from "classnames";

type HTMLProps = HTMLTextAreaElement | HTMLInputElement;

interface StyledInputProps extends InputHTMLAttributes<HTMLProps> {
  label: string;
  inputType: "custom" | "input" | "textarea";
  children?: ReactNode;
}

const SHARED_INPUT_PROPS =
  "shadow border rounded focus:outline-none focus:shadow-outline w-full md:w-3/4 p-2";

function StyledInput({
  label,
  className: propsClassName,
  inputType,
  children,
  ...inputProps
}: StyledInputProps) {
  const renderedInput = useMemo(() => {
    switch (inputType) {
      case "input":
      default:
        return (
          <input
            className={classNames(SHARED_INPUT_PROPS, propsClassName)}
            {...inputProps}
          />
        );
      case "textarea":
        return (
          <textarea
            className={classNames(
              SHARED_INPUT_PROPS,
              "resize-none",
              propsClassName
            )}
            {...inputProps}
          />
        );
      case "custom":
        return children || null;
    }
  }, [inputProps, inputType, children]);

  return (
    <div className="mb-4">
      <label className="block">{label}</label>
      <div className="mt-1">{renderedInput}</div>
    </div>
  );
}

export default StyledInput;
