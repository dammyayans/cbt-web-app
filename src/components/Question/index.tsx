import React, {useState} from 'react';
import Option from './Option';
import './index.css';

const Question = ({details}) => {
  const {title, img, number, question, code} = details || {};
  const [selectedAnswer, setSelectedAnswer] = useState('');
  return (
    <div className="">
      <p className="text-[22px] mb-6">Question 1</p>
      <p className="text-[22px] mb-[40px]">
        What is the name of the anchor of the TV program “Who wants to be a
        millionaire?”
      </p>
      <hr className="text-[#E0E0E0] mb-[40px]" />
      <div>
        <Option
          onClick={() => setSelectedAnswer('Option 1')}
          text="Option 1"
          selected={selectedAnswer === 'Option 1'}
        />
        <Option
          onClick={() => setSelectedAnswer('Option 2')}
          text="Option 2"
          selected={selectedAnswer === 'Option 2'}
        />
        <Option
          onClick={() => setSelectedAnswer('Option 3')}
          text="Option 3"
          selected={selectedAnswer === 'Option 3'}
        />
        <Option
          onClick={() => setSelectedAnswer('Option 4')}
          text="Option 4"
          selected={selectedAnswer === 'Option 4'}
        />
      </div>
    </div>
  );
};

export default Question;
