import AnimatedContainer from "../AnimatedContainer";
import sideBanner from "assets/images/side-banner.png";
import logo from "assets/images/unilorin-logo.png";
const Layout = ({ children }) => {
  return (
    <AnimatedContainer>
      <div className="min-h-screen h-full mr-4 md:mr-8">
        <div className="grid grid-cols-1 h-full md:grid-cols-3">
          <div className="col-span-1 bg-primary relative">
            <div className="container px-4 md:px-8">
              <img
                src={sideBanner}
                alt="side banner"
                className="absolute left-0 bottom-0 w-full"
              />
              <div className="flex items-center mt-[40px] z-50 relative">
                <img src={logo} alt="unilorin" />
                <p className="ml-2 text-white">University of Ilorin</p>
              </div>
              <p className="text-white mt-8 z-50 relative">
                Welcome to University Of Ilorin CBT
              </p>
            </div>
          </div>
          <div className="col-span-2 flex ml-5 items-center h-screen">
            {children}
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default Layout;
