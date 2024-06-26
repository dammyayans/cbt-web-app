import cn from "classnames";
import Loader from "components/Loader";
import { PropsType } from "types";

interface IButton extends PropsType {
  type?: "button" | "submit" | "reset";
  onClick?: (() => null) | (() => void);
  variant?: "contained" | "outlined" | "text";
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  isDisabled?: boolean;
  hoverStyle?: boolean;
  full?: boolean;
}

const Button: React.FC<IButton> = ({
  children,
  type = "button",
  leftIcon,
  rightIcon,
  variant = "contained",
  className = "",
  loading = false,
  isDisabled = false,
  full = false,
  hoverStyle = true,
  ...rest
}) => {
  return (
    <button
      disabled={loading || isDisabled}
      className={cn(
        `py-3 px-11 border font-bold rounded-xl text-sm flex justify-center items-center duration-300 transition-all children:border-white bg-none  ${className}`,
        {
          "border-primary bg-primary":
            !className.includes("bg-") && variant !== "text",
          "hover:bg-white hover:text-primary hover:children:border-primary":
            hoverStyle,
          " text-white btn-primary-shadow":
            variant === "contained" && !isDisabled,
          "bg-light-shade-gray text-white btn-primary-shadow":
            isDisabled && variant !== "outlined",
          "w-full": full,
          "text-primary border-primary border btn-primary-shadow":
            variant === "outlined",
          "text-primary": variant === "text",
          "border-none": variant === "text",
        }
      )}
      // className={`${style} text-center w-full py-5 font-bold rounded-xl text-sm flex justify-center items-center ${className}`}
      type={type}
      {...rest}
    >
      {leftIcon && leftIcon}
      {loading ? (
        <Loader className="ml-0" />
      ) : (
        <>
          {children}
          {rightIcon && rightIcon}
        </>
      )}
    </button>
  );
};

export default Button;
