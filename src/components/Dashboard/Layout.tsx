import {useEffect, useState} from 'react';
import {useLocation} from 'react-router';

import NavLink from './NavLink';
import DashboardHeader from 'components/DashboardHeader';

import {useAuth} from 'context/auth-context';
import logo from 'assets/images/unilorin-logo.png';
import screens from 'constants/screens';
import './index.css';
import {useAdmin} from 'context/admin-context';
import {useLecturer} from 'context/lecturer-context';
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
  const {lecturer} = useLecturer();
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
                        fill={
                          location.pathname === screens.lecturerDashboard
                            ? '#000'
                            : '#fff'
                        }
                      />
                    </svg>
                  }
                  to={screens.lecturerDashboard}>
                  Dashboard
                </NavLink>
                <NavLink
                  isActive={location.pathname.includes(screens.lecturerCourses)}
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
                          location.pathname.includes(screens.lecturerCourses)
                            ? '#000'
                            : '#fff'
                        }
                      />
                    </svg>
                  }
                  to={screens.lecturerCourses}>
                  My Courses
                </NavLink>
                <NavLink
                  isActive={location.pathname.includes(
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
                        d="M22.5 18V16.5H20.9242C20.8275 16.0305 20.6411 15.5841 20.3752 15.1852L21.4928 14.0677L20.4323 13.0073L19.3148 14.1248C18.9159 13.8589 18.4695 13.6725 18 13.5757V12H16.5V13.5757C16.0305 13.6725 15.5841 13.8589 15.1852 14.1248L14.0677 13.0073L13.0073 14.0677L14.1248 15.1852C13.8589 15.5841 13.6725 16.0305 13.5757 16.5H12V18H13.5757C13.6725 18.4695 13.8589 18.9159 14.1248 19.3148L13.0073 20.4323L14.0677 21.4928L15.1852 20.3752C15.5841 20.6411 16.0305 20.8275 16.5 20.9242V22.5H18V20.9242C18.4695 20.8275 18.9159 20.6411 19.3148 20.3752L20.4323 21.4928L21.4928 20.4323L20.3752 19.3148C20.6411 18.9159 20.8275 18.4695 20.9242 18H22.5ZM17.25 19.5C16.805 19.5 16.37 19.368 16 19.1208C15.63 18.8736 15.3416 18.5222 15.1713 18.111C15.001 17.6999 14.9564 17.2475 15.0432 16.811C15.13 16.3746 15.3443 15.9737 15.659 15.659C15.9737 15.3443 16.3746 15.13 16.811 15.0432C17.2475 14.9564 17.6999 15.001 18.111 15.1713C18.5222 15.3416 18.8736 15.63 19.1208 16C19.368 16.37 19.5 16.805 19.5 17.25C19.4994 17.8466 19.2622 18.4185 18.8403 18.8403C18.4185 19.2622 17.8466 19.4994 17.25 19.5Z"
                        fill={
                          location.pathname.includes(screens.lecturerSettings)
                            ? '#000'
                            : '#fff'
                        }
                      />
                      <path
                        d="M18.75 3.75H16.5V3C16.4988 2.60254 16.3404 2.2217 16.0593 1.94065C15.7783 1.6596 15.3975 1.50119 15 1.5H9C8.60254 1.50119 8.2217 1.6596 7.94065 1.94065C7.6596 2.2217 7.50119 2.60254 7.5 3V3.75H5.25C4.85254 3.75119 4.4717 3.9096 4.19065 4.19065C3.9096 4.4717 3.75119 4.85254 3.75 5.25V21C3.75119 21.3975 3.9096 21.7783 4.19065 22.0593C4.4717 22.3404 4.85254 22.4988 5.25 22.5H10.5V21H5.25V5.25H7.5V7.5H16.5V5.25H18.75V9.75H20.25V5.25C20.2488 4.85254 20.0904 4.4717 19.8093 4.19065C19.5283 3.9096 19.1475 3.75119 18.75 3.75ZM15 6H9V3H15V6Z"
                        fill={
                          location.pathname.includes(screens.lecturerSettings)
                            ? '#000'
                            : '#fff'
                        }
                      />
                    </svg>
                  }
                  to={screens.lecturerSettings}>
                  Settings
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
                  isActive={location.pathname.includes(screens.adminCourses)}
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
                          location.pathname.includes(screens.adminCourses)
                            ? '#000'
                            : '#fff'
                        }
                      />
                    </svg>
                  }
                  to={screens.adminCourses}>
                  Courses
                </NavLink>
                <NavLink
                  isActive={location.pathname.includes(screens.adminStudents)}
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
                          location.pathname.includes(screens.adminStudents)
                            ? '#000'
                            : '#fff'
                        }
                      />
                    </svg>
                  }
                  to={screens.adminStudents}>
                  Students
                </NavLink>
              </div>
            )}
            <div className="w-full mt-auto mb-[80px] pt-[10px] border-t-[3px] border-[#2768C9]">
              <button
                className="nav-link logout-btn"
                onClick={signOut}
                type="button">
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18 21C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7957 21 18L21 6C21 5.20435 20.6839 4.44129 20.1213 3.87868C19.5587 3.31607 18.7957 3 18 3L14 3C13.2044 3 12.4413 3.31607 11.8787 3.87868C11.3161 4.44129 11 5.20435 11 6L11 11L6.414 11L8.707 8.707C8.88916 8.5184 8.98995 8.2658 8.98767 8.0036C8.9854 7.7414 8.88023 7.49059 8.69482 7.30518C8.50941 7.11978 8.2586 7.01461 7.9964 7.01233C7.73421 7.01005 7.4816 7.11084 7.293 7.293L3.293 11.293C3.10553 11.4805 3.00021 11.7348 3.00021 12C3.00021 12.2652 3.10553 12.5195 3.293 12.707L7.293 16.707C7.38525 16.8025 7.49559 16.8787 7.6176 16.9311C7.7396 16.9835 7.87082 17.0111 8.0036 17.0123C8.13638 17.0134 8.26806 16.9881 8.39095 16.9378C8.51385 16.8875 8.6255 16.8133 8.7194 16.7194C8.81329 16.6255 8.88754 16.5139 8.93782 16.391C8.9881 16.2681 9.01341 16.1364 9.01225 16.0036C9.0111 15.8708 8.98351 15.7396 8.9311 15.6176C8.87869 15.4956 8.80251 15.3852 8.707 15.293L6.414 13L11 13L11 18C11 18.7956 11.3161 19.5587 11.8787 20.1213C12.4413 20.6839 13.2044 21 14 21L18 21ZM11 13L16 13C16.2652 13 16.5196 12.8946 16.7071 12.7071C16.8946 12.5196 17 12.2652 17 12C17 11.7348 16.8946 11.4804 16.7071 11.2929C16.5196 11.1054 16.2652 11 16 11L11 11L11 13Z"
                      fill="white"
                    />
                  </svg>
                </div>
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
            <div className="bg-[#E5E5E5] min-h-screen">
              {type === 'admin' ? (
                <DashboardHeader
                  avatar="https://www.svgrepo.com/show/165876/avatar.svg"
                  name={admin?.username}
                />
              ) : (
                <DashboardHeader
                  avatar="https://www.svgrepo.com/show/165876/avatar.svg"
                  name={lecturer?.firstName}
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
