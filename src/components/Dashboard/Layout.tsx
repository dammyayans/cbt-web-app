import {useEffect, useState} from 'react';
import {useLocation} from 'react-router';

import NavLink from './NavLink';
import DashboardHeader from 'components/DashboardHeader';

import {useAuth} from 'context/auth-context';
import logo from 'assets/images/unilorin-logo.png';
import screens from 'constants/screens';
import './index.css';
import {useAdmin} from 'context/admin-context';
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
  const {admin} = useAdmin();
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
              <img src={logo} className="h-[33px]" alt="unilorin" />
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
                        fill={
                          location.pathname === screens.adminDashboard
                            ? '#000'
                            : '#fff'
                        }
                      />
                    </svg>
                  }
                  to={screens.adminDashboard}>
                  Dashboard
                </NavLink>
                <NavLink
                  isActive={location.pathname === screens.adminlecturers}
                  icon={
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 0H15.5V2.5H14.5V1H1V12.5H11.6935V13.5H0V0ZM15 6.5C15.3978 6.5 15.7794 6.34196 16.0607 6.06066C16.342 5.77936 16.5 5.39782 16.5 5C16.5 4.60218 16.342 4.22064 16.0607 3.93934C15.7794 3.65804 15.3978 3.5 15 3.5C14.6022 3.5 14.2206 3.65804 13.9393 3.93934C13.658 4.22064 13.5 4.60218 13.5 5C13.5 5.39782 13.658 5.77936 13.9393 6.06066C14.2206 6.34196 14.6022 6.5 15 6.5ZM16.0155 7.505C16.665 7.505 17.179 7.797 17.5155 8.248C17.83 8.6705 17.963 9.193 17.993 9.6755C18.0235 10.165 17.953 10.678 17.7945 11.1355C17.6445 11.5705 17.391 12.0205 17 12.329V17.25C17.0004 17.4384 16.9298 17.6201 16.8023 17.7589C16.6748 17.8976 16.4997 17.9833 16.312 17.9989C16.1242 18.0144 15.9374 17.9587 15.7888 17.8429C15.6402 17.727 15.5407 17.5594 15.51 17.3735L14.865 13.5H14.716L13.987 17.388C13.9524 17.5715 13.8506 17.7355 13.7014 17.8479C13.5523 17.9603 13.3666 18.013 13.1807 17.9958C12.9948 17.9785 12.8219 17.8925 12.6961 17.7546C12.5702 17.6167 12.5003 17.4367 12.5 17.25V10.1165C12.4 10.2688 12.3013 10.422 12.204 10.576L12.165 10.6375L12.155 10.6535L12.1525 10.658C12.0851 10.7662 11.9913 10.8554 11.8798 10.9173C11.7683 10.9791 11.643 11.0116 11.5155 11.0115H9.0155C8.81659 11.0115 8.62582 10.9325 8.48517 10.7918C8.34452 10.6512 8.2655 10.4604 8.2655 10.2615C8.2655 10.0626 8.34452 9.87182 8.48517 9.73117C8.62582 9.59052 8.81659 9.5115 9.0155 9.5115H11.104C11.2255 9.3235 11.3855 9.0795 11.5535 8.8345C11.7285 8.579 11.9215 8.3085 12.0935 8.0965C12.177 7.993 12.2705 7.885 12.3645 7.7965C12.4105 7.753 12.4745 7.6965 12.5525 7.6465C12.6902 7.55615 12.8509 7.50721 13.0155 7.5055H16.0155V7.505Z"
                        fill={
                          location.pathname === screens.adminlecturers
                            ? '#000'
                            : '#fff'
                        }
                      />
                    </svg>
                  }
                  to={screens.adminlecturers}>
                  Lecturers
                </NavLink>
                <NavLink
                  isActive={location.pathname === screens.adminCourses}
                  icon={
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14 0H2C0.9 0 0 0.9 0 2V18C0 19.1 0.9 20 2 20H14C15.1 20 16 19.1 16 18V2C16 0.9 15.1 0 14 0ZM5 1.5H8V7L6.5 6L5 7V1.5ZM14.5 18.5H1.5V1.5H4V8.5L6.5 7L9 8.5V1.5H14.5V18.5Z"
                        fill={
                          location.pathname === screens.adminCourses
                            ? '#000'
                            : '#fff'
                        }
                      />
                    </svg>
                  }
                  to={screens.adminCourses}>
                  Courses
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
            <div className="">
              {type === 'admin' && (
                <DashboardHeader
                  avatar="https://www.svgrepo.com/show/165876/avatar.svg"
                  name={admin.username}
                />
              )}
              {children}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
