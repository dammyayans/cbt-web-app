import React from "react";

const DashboardHeader = ({ avatar, name }) => {
  return (
    <div className="bg-white fixed border-b-4 right-0 left-0 md:left-[250px] border-b-primary z-10">
      <div className="md:px-8 px-4 mx-auto">
        <div className="flex justify-between items-center py-[10px]">
          <div className="flex items-center">
            <p className="text-[13px] text-darkslategray">Welcome, {name}</p>
          </div>
          <div className="flex">
            <img
              src={avatar}
              height="48px"
              width="48px"
              className="rounded-xl mr-2"
              alt="admin"
            />
            <div className="">
              {/* <p className="text-[7px] text-dimgray">Welcome,</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
