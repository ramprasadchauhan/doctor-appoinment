import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-login-box-line",
    },
  ];

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
    // {
    //   name: "Profile",
    //   path: `/doctor/profile/${user?._id}`,

    //   icon: "ri-user-line",
    // },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
      icon: "ri-user-star-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
  ];
  const menuToBeRendered = userMenu;
  console.log(collapsed);
  return (
    <div className="main">
      <div className="flex w-full ">
        <div className="sidebar bg-gray-50 rounded border h-full w-fit px-4">
          <div className="sidebar-header flex items-center justify-center flex-col pt-10 gap-5">
            <div className="">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src="https://img.freepik.com/free-vector/medical-video-call-consultation-illustration_88138-415.jpg?w=740&t=st=1712514492~exp=1712515092~hmac=9f754cca6fe65cbc370b7fee2b3aa15305f5b9e4aebf4a8fa70d9c79a1cf4831"
                alt="doctor"
              />
            </div>
            <div className="menu min-h-screen">
              {menuToBeRendered.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <Link
                    to={menu.path}
                    className={` ${
                      isActive && "bg-green-500 text-white hover:bg-green-500"
                    } menu-item flex gap-5 my-10 px-4 py-2 hover:bg-gray-100 transition duration-200 ease-in-out rounded-lg`}
                    key={menu.name}
                  >
                    <i className={menu.icon}></i>
                    <p className={`${collapsed ? "hidden" : "block"}`}>
                      {menu.name}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className="content flex-1">
          <div className="header bg-white shadow-lg mb-5 h-14 flex items-center justify-between w-full sticky top-0">
            <i
              onClick={() => setCollapsed(!collapsed)}
              className={`${
                collapsed ? "ri-menu-line" : "ri-close-line"
              } font-semibold cursor-pointer pl-2 text-2xl hover:scale-110`}
            ></i>
          </div>
          <div className="body"> {children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
