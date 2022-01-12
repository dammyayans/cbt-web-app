import React, {useState} from 'react';
import Option from './Option';
import './index.css';

const AdminQuestion = ({details, sn}) => {
  const {img, question, option_a, option_b, option_c, option_d, answer} =
    details || {};
  return (
    <div className="">
      <p className="text-[22px] mb-6">Question {sn}</p>
      <p className="text-[22px] mb-[40px]">
        {/* What is the name of the anchor of the TV program “Who wants to be a
        millionaire?” */}
        {question}
      </p>
      <div>
        {option_a && <Option text={option_a} selected={answer === option_a} />}
        {option_b && <Option text={option_b} selected={answer === option_b} />}
        {option_c && <Option text={option_c} selected={answer === option_c} />}
        {option_d && <Option text={option_d} selected={answer === option_d} />}
      </div>
      <hr className="text-[#E0E0E0] mt-7 mb-6" />
    </div>
  );
};

export default AdminQuestion;
