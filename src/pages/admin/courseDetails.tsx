import AdminQuestion from 'components/AdminQuestion';
import AnimatedContainer from 'components/AnimatedContainer';
import Button from 'components/Button';
import DashboardLayout from 'components/Dashboard/Layout';
import questions from 'constants/Questions';
import React from 'react';

const CourseDetails = () => {
  return (
    <DashboardLayout type="admin">
      <AnimatedContainer className="md:px-8 px-4 container mx-auto w-full mt-[85px]">
        <h3 className="font-bold text-3xl pt-8">course.courseTitle</h3>
        <div className="flex mt-6 justify-between items-center">
          <div className="flex-auto w-2/3">
            <div className="relative">
              <p className="text-xl mb-2">course.courseCode</p>
              <p className="text-[15px] mb-2">
                By course.lecturer.firstName course.lecturer.firstName -
                course.lecturer.department
              </p>
              <div className="flex">
                <p className="text-[15px] mr-4">course.unit Credit</p>
                <p className="text-[15px]">course.status</p>
              </div>
            </div>
          </div>
          <div className="flex-auto flex justify-end w-1/3">
            <Button
              hoverStyle={false}
              type="button"
              className="px-2"
              onClick={() => null}>
              Show Exam
            </Button>
          </div>
        </div>
        <h3 className="font-bold text-3xl mt-6 mb-4">Questions</h3>
        <div className="bg-white rounded-[15px] p-7 mb-4">
          {questions.map(q => (
            <AdminQuestion key={q.id} details={q} />
          ))}
        </div>
        <div className="flex my-4 justify-end">
          <Button
            type="button"
            className="mr-2 px-2"
            hoverStyle={false}
            onClick={() => null}>
            Approve Exam
          </Button>
        </div>
      </AnimatedContainer>
    </DashboardLayout>
  );
};

export default CourseDetails;
