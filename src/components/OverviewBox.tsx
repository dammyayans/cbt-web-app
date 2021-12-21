import React from 'react';

import cn from 'classnames';

interface IOverviewButton {
  type?: string;
  onClick?: (() => null) | (() => void);
  className?: string;
}

const OverviewBox: React.FC<IOverviewButton> = ({
  children,
  type = 'default',
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        `h-6 w-6 flex justify-center items-center text-[13px] mr-2 mb-2 rounded-[3.8px]`,
        {'bg-lightsteelblue text-black': type === 'default'},
        {'bg-mediumblue text-white': type === 'done'},
      )}>
      {children}
    </button>
  );
};

export default OverviewBox;
