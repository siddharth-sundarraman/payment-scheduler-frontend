import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const AddPaymentMethod = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState("");
  const [stripeAccountId, setStripeAccountId] = useState("");
  const [stripePaymentMethodId, setStripePaymentMethodId] = useState("");

  const { authTokens, logoutUser } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/paymentmethods/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        title,
        stripe_account_id: stripeAccountId,
        stripe_payment_method_id: stripePaymentMethodId,
      }),
    });
    const data = await response.json();

    if (response.status === 201) {
      onAdd(data);
      setTitle("");
      setStripeAccountId("");
      setStripePaymentMethodId("");
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <div className="mx-8 md:ml-8 md:mr-4 relative overflow-x-auto shadow-xl border border-gray-100 rounded-lg ">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg">
        <h1 className="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
          Add Payment Method
        </h1>
        <div className="flex whitespace-nowrap  mb-4 px-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="form-input block ml-4 mr-10 px-4 w-[200px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:border-[#9578ff] focus:outline-none"
            required
          />
          <label
            htmlFor="stripe_account_id"
            className="block text-gray-700 font-medium mb-2 mx-4"
          >
            Stripe Account ID
          </label>
          <input
            type="text"
            id="stripe_account_id"
            name="stripe_account_id"
            value={stripeAccountId}
            onChange={(event) => setStripeAccountId(event.target.value)}
            className="form-input block ml-4 mr-10 px-4 w-[250px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:border-[#9578ff] focus:outline-none"
            required
          />
        </div>
        <div className="grid md:grid-cols-2 justify-between pb-4">
          <div className="flex px-4">
            <label
              htmlFor="stripe_payment_method_id"
              className="block text-gray-700 font-medium mb-2 mr-4"
            >
              Stripe PM ID
            </label>
            <input
              type="text"
              id="stripe_payment_method_id"
              name="stripe_payment_method_id"
              value={stripePaymentMethodId}
              onChange={(event) => setStripePaymentMethodId(event.target.value)}
              className="form-input block ml-4 mr-10 px-4 w-[250px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:border-[#9578ff] focus:outline-none h-8"
              required
            />
          </div>
          <div className="flex my-4 h-10 md:my-0 md:mx-4">
            <button
              type="submit"
              className="bg-[#9578ff] hover:bg-[#6551b0] text-white font-medium py-2 px-4 mx-4 rounded"
            >
              Add Payment Method
            </button>
            <button
              onClick={onCancel}
              className="bg-[#9578ff] hover:bg-[#6551b0] text-white font-medium py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPaymentMethod;
