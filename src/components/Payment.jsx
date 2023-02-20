import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { AiFillPlusCircle } from "react-icons/ai";

const Payment = () => {
  const [payments, setpayments] = useState([]);
  const { authTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    getpayments();
  }, []);

  const getpayments = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/payments/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setpayments(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <div>
      <div className="mx-8 my-8 relative overflow-x-auto shadow-xl border border-gray-100 rounded-lg">
        <h1 className="flex justify-between p-5 text-lg font-semibold text-left text-gray-900 bg-white ">
          Completed Payments
        </h1>

        <table className=" w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs  border-b border-gray-100 text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Recipient Email
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Instance
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>

          <tbody className="bg-white ">
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {payment.title}
                </td>
                <td className="px-6 py-4">{payment.recipient_email}</td>
                <td className="px-6 py-4">{payment.payment_instance}</td>
                <td className="px-6 py-4">{payment.amount}</td>
                <td className="px-6 py-4">{payment.status}</td>
                <td className="px-6 py-4">{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;
