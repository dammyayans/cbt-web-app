import Option from "./Option";
import "./index.css";
// import reactStringReplace from 'react-string-replace';

const keyWord = "___";

const AdminQuestion = ({ details, sn }) => {
  const { image, question, option_a, option_b, option_c, option_d, answer } =
    details || {};

  return (
    <div className="">
      <p className="text-[22px] mb-6">Question {sn}</p>
      <div className="mb-[40px]">
        <p
          className="text-[22px] "
          dangerouslySetInnerHTML={{ __html: question }}
        ></p>
        {image ? (
          <img src={image} alt={question} className="h-[200px] my-4" />
        ) : null}
      </div>

      {!question?.includes(keyWord) ? (
        <div>
          {option_a && (
            <Option text={option_a} selected={answer === option_a} />
          )}
          {option_b && (
            <Option text={option_b} selected={answer === option_b} />
          )}
          {option_c && (
            <Option text={option_c} selected={answer === option_c} />
          )}
          {option_d && (
            <Option text={option_d} selected={answer === option_d} />
          )}
        </div>
      ) : (
        answer && <Option text={answer} selected />
      )}
      <hr className="text-[#E0E0E0] mt-7 mb-6" />
    </div>
  );
};

export default AdminQuestion;
