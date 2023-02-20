import React, { useContext } from "react";
import loginImage from "../assets/login.svg";
import { Icon } from "@iconify/react";
import AuthContext from "../context/AuthContext";

const Account = () => {
  let { loginUser } = useContext(AuthContext);

  return (
    <div>
      <section className="h-screen max-w-[1240px]">
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0 mx-auto ">
              <img src={loginImage} className="w-[75%] " alt="Login image" />
            </div>
            <div className="md:w-7/12 lg:w-4/12 md:my-8">
              <form onSubmit={loginUser}>
                <div className=" p-8 border border-gray-100 shadow-xl">
                  <Icon
                    icon="mdi:user-outline"
                    fontSize={60}
                    color="#9578ff"
                    className="mx-auto mb-4 mt-[-57px] border rounded-full border-gray-200 px-2 bg-white"
                  />

                  <div className="mb-6">
                    <input
                      type="text"
                      className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Username"
                      name="username"
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      type="password"
                      className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Password"
                      name="password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-[#9578ff] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:scale-105 duration-75 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#634cb5] active:shadow-lg transition ease-in-out w-full"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <form>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">OR</p>
                </div>

                <div className=" p-8 my-8 border border-gray-100 shadow-xl">
                  <Icon
                    icon="mdi:register-outline"
                    fontSize={60}
                    color="#9578ff"
                    className="mx-auto mb-4 mt-[-57px] border rounded-full border-gray-200 px-2 bg-white"
                  />
                  <div className="mb-6">
                    <input
                      type="text"
                      className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Username"
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      type="password"
                      className="form-control block w-full px-4 py-2  font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                      placeholder="Password"
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      type="password"
                      className="form-control block w-full px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
                      placeholder="Confirm Password"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-[#9578ff] text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:scale-105 duration-75 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#634cb5] active:shadow-lg transition  ease-in-out w-full"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Account;
