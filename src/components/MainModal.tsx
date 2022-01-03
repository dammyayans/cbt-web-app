import cn from 'classnames';
import React from 'react';
import Button from './Button';

interface ModalProps {
  isVisible: boolean;
  title: string;
}

const MainModal: React.FC<ModalProps> = ({children, isVisible, title}) => (
  <div
    className={cn(
      'fixed top-0 left-0 w-full h-full bg-[#999999] bg-opacity-70 z-10 flex flex-col items-center justify-end transition-all duration-500 md:justify-center',
      {'transform translate-y-full': !isVisible},
    )}>
    <div
      className={cn(
        'bg-transparent flex-1 w-full md:absolute md:w-full md:h-full md:top-0 md:left-0 md:z-10',
      )}
      //   onClick={onClose}
    />
    <div className=" bg-white w-[90%] mx-auto md:w-[560px] p-8 overflow-y-auto md:relative md:z-20">
      <div>
        <h3 className="text-xl font-bold mb-7">{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  </div>
);

export default MainModal;
