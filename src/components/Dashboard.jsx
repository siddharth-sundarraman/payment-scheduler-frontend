import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

import PaymentMethod from "./PaymentMethod";
import PaymentInstance from "./PaymentInstance";
import Payment from "./Payment";
import Settings from "./Settings";

const Dashboard = () => {
  let { user } = useContext(AuthContext);

  return (
    <div>
      <div>
        {user && (
          <h1 className="text-3xl m-8 text-[#232338]">
            Welcome {user.username}
          </h1>
        )}
      </div>

      <div className="grid md:flex">
        <PaymentMethod />
        <Settings />
      </div>

      <PaymentInstance />
      <Payment />
    </div>
  );
};

export default Dashboard;
