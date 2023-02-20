import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { AiFillPlusCircle } from "react-icons/ai";
import AddPaymentInstance from "./AddPaymentInstance";

const PaymentInstance = () => {
  const [paymentInstances, setPaymentInstances] = useState([]);
  const [showAddPaymentInstance, setShowAddPaymentInstance] = useState(false);
  const { authTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    getpaymentInstances();
  }, []);

  const handleAddPaymentInstance = (newPaymentInstance) => {
    setPaymentInstances((prevPaymentInstances) => [
      ...prevPaymentInstances,
      newPaymentMethod,
    ]);
    setShowAddPaymentInstance(false);
  };

  const handleCancel = () => {
    setShowAddPaymentInstance(false);
  };

  const getpaymentInstances = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/paymentinstances/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setPaymentInstances(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <div>
      {showAddPaymentInstance ? (
        <AddPaymentInstance
          onAdd={handleAddPaymentInstance}
          onCancel={handleCancel}
        />
      ) : (
        <div className="mx-8 my-8 relative overflow-x-auto shadow-xl border border-gray-100 rounded-lg">
          <h1 className="flex justify-between p-5 text-lg font-semibold text-left text-gray-900 bg-white ">
            Payment Instances
            <AiFillPlusCircle
              size={30}
              className="text-[#9578ff] hover:text-[#6551b0]"
              onClick={() => setShowAddPaymentInstance(true)}
            />
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
                  Recipient Stripe ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Method
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3">
                  End Date
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>

            <tbody className="bg-white ">
              {paymentInstances.map((paymentInstance) => (
                <tr key={paymentInstance.id}>
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {paymentInstance.title}
                  </td>
                  <td className="px-6 py-4">
                    {paymentInstance.recipient_email}
                  </td>
                  <td className="px-6 py-4">
                    {paymentInstance.recipient_stripe_id}
                  </td>
                  <td className="px-6 py-4">
                    {paymentInstance.payment_method}
                  </td>
                  <td className="px-6 py-4">{paymentInstance.amount}</td>
                  <td className="px-6 py-4">{paymentInstance.start_date}</td>
                  <td className="px-6 py-4">{paymentInstance.end_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentInstance;
