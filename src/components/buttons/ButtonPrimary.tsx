import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {
  title?: string;
  variant?: string;
  className?: string;
  isLoading?: boolean;
  type?: "button" | "submit";
  onClick?: VoidFunction | undefined;
}

export default function ButtonPrimary({
  title = "Submit",
  variant = "solid",
  className,
  isLoading = false,
  type = "button",
  onClick,
  ...rest
}: Props) {
  const [buttonStyle, setButtonStyle] = useState<string>("");

  useEffect(() => {
    switch (variant) {
      case "outline":
        setButtonStyle(
          `bg-transparent text-yellowPrimary border-2 border-green-primary hover:bg-green-primary`
        );
        break;
      case "ghost":
        setButtonStyle(
          `bg-transparent hover:bg-green-primary hover:text-white text-green-secondary`
        );
        break;
      default:
        setButtonStyle(
          `bg-green-secondary text-black hover:bg-green-primary hover:text-white`
        );
    }
  }, [variant]);

  return (
    <button
      className={clsx(
        `w-full px-4 py-3 rounded-md md:rounded-lg font-semibold cursor-pointer ${buttonStyle}`,
        className
      )}
      disabled={isLoading ? true : false}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {isLoading ? (
        <div className="w-full flex flex-row justify-center items-center gap-2">
          <span
            className={clsx(
              `loader w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${
                variant === "solid"
                  ? `border-darkPrimary`
                  : variant === "outline"
                  ? `border-yellowPrimarry`
                  : "border-yellowPrimary"
              }`,
              buttonStyle
            )}
          ></span>

          <p className="font-semibold">Loading...</p>
        </div>
      ) : (
        title
      )}
    </button>
  );
}
