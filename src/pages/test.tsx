import React, {useState} from 'react';
import AnimatedContainer from 'components/AnimatedContainer';
import Header from 'components/Header';
import SwipeableViews from 'react-swipeable-views';
import Question from 'components/Question';
import Button from 'components/Button';
import {ReactComponent as TimerIcon} from 'assets/icons/timer.svg';
import OverviewBox from 'components/OverviewBox';
const Test = () => {
  const [overview, setOverview] = useState(
    Array.from(Array(50).keys()).map(n => ({
      no: n,
      type: 'default',
    })),
  );
  return (
    <AnimatedContainer>
      <Header
        avatar="https://image.shutterstock.com/z/stock-photo-inmage-of-pensive-concentrated-woman-doctor-sitting-at-table-and-working-on-laptop-computer-2083183264.jpg"
        firstname="Grey"
        lastname="Willson"
        matricNo="16/30gr022"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        <div className="col-span-2 bg-whitesmoke mt-[72px]">
          <div className="mt-14 px-4 md:px-14">
            <h2 className="text-3xl mb-12">ABE 505 - Engineering Management</h2>
            <Question details={{}} />
            <div className="flex justify-center my-12">
              <Button className="mr-14 bg-mediumblue  py-[10px]">
                Previous
              </Button>
              <Button className="bg-mediumblue py-[10px]">Next</Button>
            </div>
          </div>
        </div>
        <div className="mt-[72px] sticky">
          <div className="mt-14 px-4 md:px-14">
            <div className="flex mb-36">
              <TimerIcon />
              <div className="ml-3">
                <p className="text-3xl">25min 15sec</p>
                <p className="text-[#666666] text-xl">remaining</p>
              </div>
            </div>
            <p className="text-[15px]">You have answered:</p>
            <p className="mb-7 text-xl">30 of 60 questions</p>
            <p className="mb-7 text-[15px]">Questions Overview:</p>
            <div className="flex flex-wrap">
              {overview.map(n => (
                <OverviewBox
                  onClick={() =>
                    setOverview(
                      overview.map(el =>
                        el.no === n.no ? {...el, type: 'done'} : el,
                      ),
                    )
                  }
                  key={n.no}
                  type={n.type}>
                  {n.no}
                </OverviewBox>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default Test;
