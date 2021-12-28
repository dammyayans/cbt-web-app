import {useEffect, useState} from 'react';
import {useLocation} from 'react-router';

import NavLink from './NavLink';

import {useAuth} from 'context/auth-context';
import logo from 'assets/images/unilorin-logo.png';
import screens from 'constants/screens';
import './index.css';
const Hamburger = () => (
  <svg
    width="31"
    height="23"
    viewBox="0 0 31 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.625 11.5H29.375"
      stroke="#0E56C0"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.625 2.25H29.375"
      stroke="#0E56C0"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.625 20.75H29.375"
      stroke="#0E56C0"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DashboardLayout = ({children, type}) => {
  // const { isAuthenticated, isLoading, token, logout } = useAuth();

  // useEffect(() => {
  //   if (token && !isAuthenticated && !isLoading) {
  //     // Invalid token
  //     logout({ redirectLocation: "/login" });
  //   }
  // }, [isLoading, isAuthenticated, token]);

  const {signOut} = useAuth();
  //   const {user} = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // console.log(router);
    // if (isOpen) setIsOpen(false);
  }, [isOpen, location.pathname]);

  return (
    <>
      <div className="dashboard">
        <div
          aria-hidden="true"
          style={{display: isOpen ? 'block' : 'none'}}
          className="bg-filter"
          onClick={() => setIsOpen(false)}
          onKeyUp={() => setIsOpen(false)}
        />
        <aside
          id="sidebar"
          className="sidebar"
          aria-label="Main sidebar containing navigation links and some information"
          aria-hidden={!isOpen ? 'false' : 'true'}>
          <div className="sidebar__content">
            <div className="flex items-center mt-10 mb-12">
              <img src={logo} alt="unilorin" />
              <p className="ml-2 text-white">University of Ilorin</p>
            </div>
            {type === 'lec' ? (
              // lecturer nav links
              <div className="nav-links">
                <NavLink
                  isActive={location.pathname === screens.lecturerDashboard}
                  icon={
                    <svg
                      width={24}
                      height={24}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22 20H11v-7h11v7zM9 20H2v-7h7v7zm13-9H2V4h20v7z"
                        fill="#fff"
                      />
                    </svg>
                  }
                  to={screens.lecturerDashboard}>
                  Dashboard
                </NavLink>
                <NavLink
                  isActive={location.pathname === '/plan'}
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H13.09C13.03 19.67 13 19.34 13 19C13 15.69 15.69 13 19 13C20.06 13 21.09 13.28 22 13.81V6C22 4.89 21.11 4 20 4ZM20 11H4V8H20V11ZM17.75 22L15 19L16.16 17.84L17.75 19.43L21.34 15.84L22.5 17.25L17.75 22Z"
                        fill="white"
                      />
                    </svg>
                  }
                  to="/plan">
                  Courses
                </NavLink>
                <NavLink
                  isActive={location.pathname.startsWith(
                    screens.lecturerSettings,
                  )}
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.8204 22H10.1804C9.9523 22 9.73107 21.9221 9.55337 21.7792C9.37567 21.6362 9.25218 21.4368 9.20337 21.214L8.79637 19.33C8.25343 19.0921 7.73861 18.7946 7.26137 18.443L5.42437 19.028C5.20694 19.0973 4.97232 19.0902 4.75949 19.0078C4.54666 18.9254 4.36842 18.7727 4.25437 18.575L2.43037 15.424C2.31752 15.2261 2.27516 14.9958 2.31021 14.7708C2.34527 14.5457 2.45568 14.3392 2.62337 14.185L4.04837 12.885C3.98357 12.2961 3.98357 11.7019 4.04837 11.113L2.62337 9.816C2.45544 9.66177 2.34489 9.45507 2.30982 9.22978C2.27476 9.00449 2.31726 8.77397 2.43037 8.576L4.25037 5.423C4.36442 5.22532 4.54266 5.07259 4.75549 4.99019C4.96832 4.90778 5.20294 4.90066 5.42037 4.97L7.25737 5.555C7.50137 5.375 7.75537 5.207 8.01737 5.055C8.27037 4.913 8.53037 4.784 8.79637 4.669L9.20437 2.787C9.25294 2.5642 9.3762 2.36469 9.55372 2.22155C9.73123 2.07841 9.95234 2.00024 10.1804 2H13.8204C14.0484 2.00024 14.2695 2.07841 14.447 2.22155C14.6245 2.36469 14.7478 2.5642 14.7964 2.787L15.2084 4.67C15.4884 4.794 15.7624 4.933 16.0274 5.088C16.2744 5.231 16.5134 5.388 16.7434 5.557L18.5814 4.972C18.7987 4.90292 19.0331 4.91017 19.2457 4.99256C19.4583 5.07495 19.6364 5.22753 19.7504 5.425L21.5704 8.578C21.8024 8.985 21.7224 9.5 21.3774 9.817L19.9524 11.117C20.0172 11.7059 20.0172 12.3001 19.9524 12.889L21.3774 14.189C21.7224 14.507 21.8024 15.021 21.5704 15.428L19.7504 18.581C19.6363 18.7787 19.4581 18.9314 19.2453 19.0138C19.0324 19.0962 18.7978 19.1033 18.5804 19.034L16.7434 18.449C16.2665 18.8003 15.752 19.0975 15.2094 19.335L14.7964 21.214C14.7476 21.4366 14.6243 21.6359 14.4468 21.7788C14.2693 21.9218 14.0483 21.9998 13.8204 22ZM11.9964 8C10.9355 8 9.91809 8.42143 9.16795 9.17157C8.4178 9.92172 7.99637 10.9391 7.99637 12C7.99637 13.0609 8.4178 14.0783 9.16795 14.8284C9.91809 15.5786 10.9355 16 11.9964 16C13.0572 16 14.0747 15.5786 14.8248 14.8284C15.5749 14.0783 15.9964 13.0609 15.9964 12C15.9964 10.9391 15.5749 9.92172 14.8248 9.17157C14.0747 8.42143 13.0572 8 11.9964 8Z"
                        fill="white"
                      />
                    </svg>
                  }
                  to={screens.lecturerSettings}>
                  Results
                </NavLink>
              </div>
            ) : (
              // admin nav links
              <div className="nav-links">
                <NavLink
                  isActive={location.pathname === screens.adminDashboard}
                  icon={
                    <svg
                      width={24}
                      height={24}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22 20H11v-7h11v7zM9 20H2v-7h7v7zm13-9H2V4h20v7z"
                        fill="#fff"
                      />
                    </svg>
                  }
                  to={screens.adminDashboard}>
                  Dashboard
                </NavLink>
              </div>
            )}
            <div className="w-full mt-auto mb-[80px] pt-[10px] border-t-[3px] border-[#2768C9]">
              <button
                className="nav-link logout-btn"
                onClick={signOut}
                type="button">
                <div>{/* <BiLogOut /> */}</div>
                <p className="nav-link__text">Log out</p>
              </button>
            </div>
          </div>
        </aside>
        <main>
          <div className="md-hidden">
            <div className="flex justify-between px-4">
              {/* <img src={fav} width={40} alt="" /> */}
              <button
                data-toggle-sidebar="sidebar"
                onClick={handleSidebarToggle}
                aria-label="Toggle the document main sidebar visibility"
                className="dashboard-hamburger ml-6"
                type="button">
                <Hamburger />
              </button>
            </div>
          </div>
          <section className="main-content">
            {/* <button
              onClick={signOut}
              type="button"
              className=" text-primary text-sm font-bold ml-auto mr-8 my-4 logout-btn-top">
              Log Out
            </button> */}
            <div className="">{children}</div>
          </section>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
