/* eslint-disable react/require-default-props */
/* eslint-disable react/button-has-type */
import React from 'react';
import cn from 'classnames';
import Loader from 'components/Loader';

interface IButton {
  type?: 'button' | 'submit' | 'reset';
  onClick?: (() => null) | (() => void);
  variant?: 'contained' | 'outlined' | 'text';
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
  type = 'button',
  leftIcon,
  rightIcon,
  variant = 'contained',
  className = '',
  loading = false,
  isDisabled = false,
  full = false,
  hoverStyle = true,
  ...rest
}) => {
  // let style: string;
  // if (variant === 'contained') {
  //   style = 'bg-primary text-white';
  // } else if (variant === 'outlined') {
  //   style = 'text-primary border-primary border';
  // }ull
  return (
    <button
      disabled={loading || isDisabled}
      className={cn(
        `text-left py-3 px-11 border font-bold rounded-xl text-sm flex justify-center items-center duration-300 transition-all border-primary children:border-white hover:children:border-primary ${className}`,
        {
          'hover:bg-white hover:text-primary': hoverStyle,
          'bg-primary text-white btn-primary-shadow':
            variant === 'contained' && !isDisabled,
          'bg-light-shade-gray text-white btn-primary-shadow':
            isDisabled && variant !== 'outlined',
          'w-full': full,
          'text-primary border-primary border btn-primary-shadow':
            variant === 'outlined',
          'text-primary': variant === 'text',
          'border-none': variant === 'text',
        },
      )}
      // className={`${style} text-center w-full py-5 font-bold rounded-xl text-sm flex justify-center items-center ${className}`}
      type={type}
      {...rest}>
      {leftIcon && leftIcon}
      {loading ? (
        <Loader />
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
