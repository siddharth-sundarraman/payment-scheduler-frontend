import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";

const Settings = () => {
  return (
    <div className="mx-8 mt-8 pb-4 md:mt-0 md:ml-4 md:mr-8 px-8 md:w-[30%] rounded-lg border border-gray-100 shadow-xl">
      <h1 className="flex justify-between py-5 text-lg font-semibold text-left text-gray-900 bg-white ">
        Notifications
      </h1>

      <div className="flex justify-between md:justify-left">
        <input
          type="text"
          className="form-control block w-1/2 md:w-3/4 px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:border-[#9578ff] focus:outline-none"
          placeholder="Email Address"
          name="email address"
        />
        <button>
          <AiFillCheckCircle
            size={30}
            className="ml-8 text-[#9578ff] hover:text-[#6551b0]"
          />
        </button>
      </div>
    </div>
  );
};

export default Settings;
