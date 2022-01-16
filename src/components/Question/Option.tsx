import cn from 'classnames';
import React from 'react';

const Option = ({text, selected, ...props}) => {
  return (
    <button
      {...props}
      className={cn(
        `rounded-[10px] opt-btn py-3 flex mb-5 px-[22px] items-center w-full`,
        {'bg-primary opt-btn-selected': selected},
        {'bg-white opt-btn-unselected': !selected},
      )}>
      <span
        className={cn(
          `rounded-full w-3 h-3 border-2 mr-6`,
          {'border-white': selected},
          {'border-[#AFAFAF]': !selected},
        )}
      />
      <p
        className={`text-xl text-${selected ? 'white' : 'darkslategray'}`}
        dangerouslySetInnerHTML={{__html: text}}></p>
    </button>
  );
};

export default Option;
