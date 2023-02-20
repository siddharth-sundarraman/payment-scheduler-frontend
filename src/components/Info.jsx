import React, { useContext } from "react";
import Stripe from "../assets/stripePayments.svg";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Info = () => {
  let { user } = useContext(AuthContext);

  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <img className="w-[400px] max-auto" src={Stripe} alt="payment image" />
        <div className="my-4">
          <p className="text-[#9578ff] font-bold">
            PEER TO PEER AUTOMATED PAYMENTS
          </p>
          <h1 className="text-[#232338] md:text-4xl sm:text-3xl text-2xl font-bold py-2">
            Welcome to Autopay
          </h1>
          <p>
            Autopay allows you to make monthly peer to peer payments seamless
            and quickly using the Stripe API. The backend rest api is served by
            Django rest framework, and the frontend is created in React JS
            framework. Get started by creating an account below!
          </p>

          {!user ? (
            <Link to="/login">
              <button className="text-white my-6 py-3 bg-[#232338] w-[200px] font-medium rounded-md  text-sm leading-snug uppercase  shadow-md hover:scale-105 duration-75 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition  ease-in-out">
                Get Started
              </button>
            </Link>
          ) : (
            <Link to="/dashboard">
              <button className="text-white my-6 py-3 bg-[#232338] w-[200px] font-medium rounded-md  text-sm leading-snug uppercase  shadow-md hover:scale-105 duration-75 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition  ease-in-out">
                Go to Dashboard
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;
