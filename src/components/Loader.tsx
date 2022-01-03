import classNames from 'classnames';
import React from 'react';

const Loader = ({className = ''}) => {
  return (
    <div
      style={{borderTopColor: 'transparent'}}
      className={classNames(
        `w-5 ml-5 h-5 border-2 rotate  border-solid rounded-full animate-spin ${className}`,
      )}
    />
  );
};

export default Loader;
