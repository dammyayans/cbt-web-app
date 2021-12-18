import cn from 'classnames';
import Button from 'components/Button';
import Layout from 'components/Layout';
import React, {useState} from 'react';

const SelectExam = () => {
  const [selected, setSelected] = useState(null);
  return (
    <Layout>
      <div className="px-4 md:pl-10 max-w-[417px] w-full">
        <h1 className="font-extrabold text-black text-4xl">Select Course</h1>
        <p className="text-gray mt-2 mb-5 text-[18px]">
          Select a course and start your exam
        </p>
        <div className="mb-4">
          {[
            {title: 'ENGINEER IN SOCIETY', courseCode: 'ABE 573'},
            {title: 'ENGINEERING MANAGEMENT', courseCode: 'ABE 505'},
          ].map((c, _) => (
            <button
              onClick={() => setSelected(_)}
              className={cn(
                `w-full rounded-[10px] border-2 py-4 px-4 text-sm text-black mb-6 cursor-pointer`,
                {
                  'bg-primary text-white border-primary': selected === _,
                  'border-border-gray': selected !== _,
                },
              )}>
              {`${c.courseCode} - ${c.title}`}
            </button>
          ))}
        </div>
        <Button className="mt-14" onClick={() => null} type="submit">
          Start
        </Button>
      </div>
    </Layout>
  );
};

export default SelectExam;
