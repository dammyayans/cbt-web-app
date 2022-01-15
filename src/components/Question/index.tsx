import React, {useState} from 'react';
import Option from './Option';
import './index.css';

const Question = ({details, number}) => {
  const {img, question, options} = details || {};
  const [selectedAnswer, setSelectedAnswer] = useState('');
  return (
    <div className="">
      <p className="text-[22px] mb-6">Question {number}</p>
      <p className="text-[22px] mb-[40px]">
        {/* What is the name of the anchor of the TV program “Who wants to be a
        millionaire?” */}
        {question}
      </p>
      <hr className="text-[#E0E0E0] mb-[40px]" />
      {options?.length ? (
        <div>
          {options.map((opt, _) => (
            <Option
              key={_}
              onClick={() => setSelectedAnswer(opt)}
              text={opt}
              selected={selectedAnswer === opt}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Question;
