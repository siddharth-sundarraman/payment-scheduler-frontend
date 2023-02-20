import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { AiFillPlusCircle } from "react-icons/ai";
import AddPaymentMethod from "./AddPaymentMethod";
import EditPaymentMethod from "./EditPaymentMethod";

const PaymentMethod = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);
  const [showEditPaymentMethod, setShowEditPaymentMethod] = useState(false);
  const { authTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    getPaymentMethods();
  }, []);

  const handleAddPaymentMethod = (newPaymentMethod) => {
    setPaymentMethods((prevPaymentMethods) => [
      ...prevPaymentMethods,
      newPaymentMethod,
    ]);
    setShowAddPaymentMethod(false);
  };

  const handleCancel = () => {
    setShowAddPaymentMethod(false);
    setShowEditPaymentMethod(false);
  };

  const handleEditPaymentMethod = (editedPaymentMethod) => {
    setPaymentMethods(
      paymentMethods.map((paymentMethod) =>
        paymentMethod.id === editedPaymentMethod.id
          ? editedPaymentMethod
          : paymentMethod
      )
    );
    setShowEditPaymentMethod(false);
  };

  const getPaymentMethods = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/paymentmethods/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setPaymentMethods(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <div className=" w-full md:w-[70%] ">
      {showAddPaymentMethod ? (
        <AddPaymentMethod
          onAdd={handleAddPaymentMethod}
          onCancel={handleCancel}
        />
      ) : showEditPaymentMethod ? (
        <EditPaymentMethod
          paymentMethod={selectedPaymentMethod}
          onSave={handleEditPaymentMethod}
          onCancel={handleCancel}
          onDelete={() => getPaymentMethods()}
        />
      ) : (
        <div className="mx-8 md:ml-8 md:mr-4 relative overflow-x-auto shadow-xl border border-gray-100 rounded-lg">
          <h1 className="flex justify-between p-5 text-lg font-semibold text-left text-gray-900 bg-white ">
            Payment Methods
            <AiFillPlusCircle
              size={30}
              className="text-[#9578ff] hover:text-[#6551b0]"
              onClick={() => setShowAddPaymentMethod(true)}
            />
          </h1>

          <table className=" w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs  border-b border-gray-100 text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Stripe Account ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Stripe Payment Method ID
                </th>
              </tr>
            </thead>

            <tbody className="bg-white ">
              {paymentMethods.map((paymentMethod) => (
                <tr
                  key={paymentMethod.id}
                  className="hover:text-[#9578ff] hover:bg-gray-100 hover:cursor-pointer"
                  sty
                  onClick={() => {
                    setSelectedPaymentMethod(paymentMethod);
                    setShowEditPaymentMethod(true);
                  }}
                >
                  <td className="px-6 py-4 font-medium whitespace-nowrap ">
                    {paymentMethod.title}
                  </td>
                  <td className="px-6 py-4">
                    {paymentMethod.stripe_account_id}
                  </td>
                  <td className="px-6 py-4">
                    {paymentMethod.stripe_payment_method_id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
