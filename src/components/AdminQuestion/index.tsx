import React, {useState} from 'react';
import Option from './Option';
import './index.css';

const AdminQuestion = ({details}) => {
  const {id, img, number, label: question, obj, an} = details || {};
  return (
    <div className="">
      <p className="text-[22px] mb-6">Question {id}</p>
      <p className="text-[22px] mb-[40px]">
        {/* What is the name of the anchor of the TV program “Who wants to be a
        millionaire?” */}
        {question}
      </p>
      <div>
        {obj.opt1 && <Option text={obj.opt1} selected={obj.ans === obj.opt1} />}
        {obj.opt2 && <Option text={obj.opt2} selected={obj.ans === obj.opt2} />}
        {obj.opt3 && <Option text={obj.opt3} selected={obj.ans === obj.opt3} />}
        {obj.opt4 && <Option text={obj.opt4} selected={obj.ans === obj.opt4} />}
      </div>
      <hr className="text-[#E0E0E0] mt-7 mb-6" />
    </div>
  );
};

export default AdminQuestion;
