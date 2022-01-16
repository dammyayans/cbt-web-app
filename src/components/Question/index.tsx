import React, {useState} from 'react';
import Option from './Option';
import './index.css';

const Question = ({details, number, overview, setOverview, overviewKey}) => {
  const {img, question, options} = details || {};

  const handleSelectedAnswer = opt => {
    const modifiedOVerview = overview.map(el =>
      el.no === number ? {...el, type: 'done', selectedAnswer: opt} : el,
    );
    setOverview(modifiedOVerview);
    localStorage.setItem(overviewKey, JSON.stringify(modifiedOVerview));
  };

  return (
    <div className="">
      <p className="text-[22px] mb-6">Question {number}</p>
      <p
        className="text-[22px] mb-[40px]"
        dangerouslySetInnerHTML={{__html: question}}></p>
      <hr className="text-[#E0E0E0] mb-[40px]" />
      {options?.length ? (
        <div>
          {options.map(
            (opt, _) =>
              opt && (
                <Option
                  key={_}
                  onClick={() => handleSelectedAnswer(opt)}
                  text={opt}
                  selected={overview[number - 1]?.selectedAnswer === opt}
                />
              ),
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Question;
