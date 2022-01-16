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
        {
          'bg-primary text-white border-2 border-[#0870D4] op-2 animate-pulse':
            type === 'doneCurrent',
        },
        {
          'bg-lightblue text-black': type === 'default' || type === 'current',
        },
        {'bg-primary text-white': type === 'done'},
        {'border-2 border-[#0870D4] op-2 animate-pulse': type === 'current'},
      )}>
      {children}
    </button>
  );
};

export default OverviewBox;
