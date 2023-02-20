import React, { useState, useContext } from "react";
import { TiThMenu } from "react-icons/ti";
import { GiCancel } from "react-icons/gi";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { ReactFragment } from "react";

const Navbar = () => {
  let { user, logoutUser } = useContext(AuthContext);

  const [menu, setMenu] = useState(false);

  const handleMenu = () => setMenu(!menu);

  return (
    <div className="flex justify-between items-center h-16 bg-[#232338] sm:mx-auto px-4 text-white">
      <Link
        to="/"
        className="w-full text-3xl font-bold md:ml-10 text-[#9578ff]"
      >
        AUTOPAY
      </Link>

      <ul className="hidden md:flex uppercase">
        <Link to="/dashboard">
          <li className=" hover:underline px-4 py-5 w-24">Home</li>
        </Link>

        {user ? (
          <React.Fragment>
            <li className="p-4 text-white">
              <button
                onClick={logoutUser}
                className=" hover:scale-105 bg-[#9578ff] mx-auto w-20 h-8 rounded-md"
              >
                Sign out
              </button>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li className="p-4 text-white">
              <Link to="/login">
                <button className=" hover:scale-105 bg-[#9578ff] mx-auto w-20 h-8 rounded-md">
                  Sign In
                </button>
              </Link>
            </li>
            <li className="p-4 text-white">
              <Link to="/login">
                <button className="hover:scale-105 bg-[#9578ff] mx-auto w-20 h-8 rounded-md">
                  Sign Up
                </button>
              </Link>
            </li>
          </React.Fragment>
        )}
      </ul>

      <div onClick={handleMenu} className="p-4">
        {menu ? (
          <GiCancel className="block " size={20} />
        ) : (
          <TiThMenu className="block md:hidden" size={20} />
        )}
      </div>
      <div
        className={
          menu
            ? "fixed item-end left-0 top-0 sm:w-[30%] w-[60%] border-r border-[#232338] h-full ease-in duration-500 bg-[#232338]"
            : "fixed left-[-100%] "
        }
      >
        <h1 className="w-full mt-[15px] m-4 text-3xl font-bold text-[#9578ff]">
          AUTOPAY
        </h1>
        <ul className="uppercase p4">
          {user ? (
            <React.Fragment>
              <Link to={"/dashboard"}>
                <li className="p-4 w-24">Home</li>
              </Link>
              <li onClick={logoutUser} className="p-4 w-24">
                Sign out
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link to={"/dashboard"}>
                <li className="p-4 w-24">Home</li>
              </Link>
              <Link to={"/login"}>
                <li className="p-4 w-24">Sign In</li>
              </Link>
              <Link to={"/login"}>
                <li className="p-4 w-24">Sign Up</li>
              </Link>
            </React.Fragment>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
