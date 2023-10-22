import logo from "assets/images/unilorin-logo.png";

const Header = ({ avatar, firstname, lastname = "", matricNo = "" }) => {
  return (
    <div className="bg-white fixed w-full z-50 border-b-4 border-b-primary">
      <div className="px-4 md:px-14">
        <div className="flex justify-between items-center py-[10px]">
          <div className="flex items-center">
            <img src={logo} alt="unilorin" />
            <p className="ml-2 text-black">University of Ilorin</p>
          </div>
          <div className="flex">
            <img
              src={avatar}
              height="48px"
              width="48px"
              className="rounded-xl mr-2"
              alt="student profile"
            />
            <div className="">
              <p className="text-[7px] text-dimgray">Welcome,</p>
              <p className="text-[13px] text-darkslategray">
                {firstname} {lastname}
              </p>
              <p>{matricNo}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
