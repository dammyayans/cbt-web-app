/* eslint-disable react/require-default-props */
/* eslint-disable react/button-has-type */
import React from 'react';
import cn from 'classnames';


interface IButton {
  type?: 'button' | 'submit' | 'reset';
  onClick?: (() => null) | (() => void);
  variant?: 'contained' | 'outlined' | 'text';
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  isDisabled?: boolean;
}

const Button: React.FC<IButton> = ({
  children,
  type = 'button',
  leftIcon,
  rightIcon,
  variant = 'contained',
  className = '',
  loading = false,
  isDisabled = false,
  ...rest
}) => {
  // let style: string;
  // if (variant === 'contained') {
  //   style = 'bg-primary text-white';
  // } else if (variant === 'outlined') {
  //   style = 'text-primary border-primary border';
  // }
  return (
    <button
      disabled={loading || isDisabled}
      className={cn(
        `text-center w-full py-5 border font-bold rounded-xl text-sm flex justify-center items-center ${className}`,
        {
          'bg-primary text-white': variant === 'contained' && !isDisabled,
          'bg-light-shade-gray text-white':
            isDisabled && variant !== 'outlined',
          'text-primary border-primary border': variant === 'outlined',
          'text-primary': variant === 'text',
          'border-none': variant === 'text',
        },
      )}
      // className={`${style} text-center w-full py-5 font-bold rounded-xl text-sm flex justify-center items-center ${className}`}
      type={type}
      {...rest}>
      {leftIcon && leftIcon}
      {loading ? (
        <div className="w-5 ml-5 h-5  border-2 rotate border-white border-solid rounded-full animate-spin" />
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
