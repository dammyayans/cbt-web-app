import cn from 'classnames';
import Button from './Button';

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

const ConfirmModal = ({isVisible, onClose}: ModalProps) => (
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
    <div className=" bg-white w-[414px] p-8 overflow-y-auto md:relative md:z-20">
      <p className="text-xl">Confirmation</p>
      <p className="text-[15px] mt-2">Are you sure you want to submit now?</p>
      <div className="flex justify-center mt-12">
        <Button
          type="button"
          className="bg-primary mr-7 hover:bg-primary border-none hover:text-white rounded-none">
          YES
        </Button>
        <Button
          onClick={onClose}
          type="button"
          className="bg-danger hover:bg-danger border-none hover:text-white rounded-none">
          NO
        </Button>
      </div>
      <p className="text-danger text-[15px] mt-[35px] text-center">
        Note: This action cannot be undone
      </p>
    </div>
  </div>
);

export default ConfirmModal;
