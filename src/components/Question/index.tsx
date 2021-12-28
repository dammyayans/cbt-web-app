import React, {useState} from 'react';
import Option from './Option';
import './index.css';

const Question = ({details}) => {
  const {id, img, number, label: question, obj} = details || {};
  const [selectedAnswer, setSelectedAnswer] = useState('');
  return (
    <div className="">
      <p className="text-[22px] mb-6">Question {id}</p>
      <p className="text-[22px] mb-[40px]">
        {/* What is the name of the anchor of the TV program “Who wants to be a
        millionaire?” */}
        {question}
      </p>
      <hr className="text-[#E0E0E0] mb-[40px]" />
      <div>
        {obj.opt1 && (
          <Option
            onClick={() => setSelectedAnswer(obj.opt1)}
            text={obj.opt1}
            selected={selectedAnswer === obj.opt1}
          />
        )}
        {obj.opt2 && (
          <Option
            onClick={() => setSelectedAnswer(obj.opt2)}
            text={obj.opt2}
            selected={selectedAnswer === obj.opt2}
          />
        )}
        {obj.opt3 && (
          <Option
            onClick={() => setSelectedAnswer(obj.opt3)}
            text={obj.opt3}
            selected={selectedAnswer === obj.opt3}
          />
        )}
        {obj.opt4 && (
          <Option
            onClick={() => setSelectedAnswer(obj.opt4)}
            text={obj.opt4}
            selected={selectedAnswer === obj.opt4}
          />
        )}
      </div>
    </div>
  );
};

export default Question;
