import cn from 'classnames';
import React from 'react';

const Option = ({text, selected, ...props}) => {
  return (
    <div {...props} className={cn(`items-center flex mb-5`)}>
      <div
        className={cn('p-[15px] mr-[15px] rounded-[6px] flex', {
          'border border-[#AFAFAF] opt-btn': !selected,
          'border bg-[#3F3CD7] border-[#3F3CD7] opt-btn-selected': selected,
        })}>
        <span
          className={cn(
            `rounded-full w-[7.2px] h-[7.2px] border`,
            {'border-white': selected},
            {'border-[#AFAFAF]': !selected},
          )}
        />
      </div>
      <p className={`text-xl text-${selected ? 'primary' : 'darkslategray'}`}>
        {text}
      </p>
    </div>
  );
};

export default Option;