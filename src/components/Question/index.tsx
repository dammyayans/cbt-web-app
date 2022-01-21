import React, {useEffect, useState} from 'react';
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

  // useEffect(() => {
  //   if (options?.length) {
  //     const filterOptions =
  //       options.length === 4
  //         ? options
  //         : options.length > 0
  //         ? options?.filter(a => a)
  //         : [];

  //     document.addEventListener('keypress', e =>
  //       e.key === 'a' && filterOptions.length > 0
  //         ? handleSelectedAnswer(filterOptions[0])
  //         : e.key === 'b' && filterOptions.length > 1
  //         ? handleSelectedAnswer(filterOptions[1])
  //         : e.key === 'c' && filterOptions.length > 2
  //         ? handleSelectedAnswer(filterOptions[2])
  //         : e.key === 'd' && filterOptions.length > 3
  //         ? handleSelectedAnswer(filterOptions[3])
  //         : null,
  //     );
  //   }
  //   return () => document.removeEventListener('keypress', () => null);
  // }, [number, details.options, overview]);

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
