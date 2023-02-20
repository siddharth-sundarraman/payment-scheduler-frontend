import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const EditPaymentMethod = ({ paymentMethod, onSave, onCancel, onDelete }) => {
  const [title, setTitle] = useState(paymentMethod.title);
  const [stripeAccountId, setStripeAccountId] = useState(
    paymentMethod.stripe_account_id
  );
  const [stripePaymentMethodId, setStripePaymentMethodId] = useState(
    paymentMethod.stripe_payment_method_id
  );

  const { authTokens, logoutUser } = useContext(AuthContext);

  const handleSave = async (event) => {
    event.preventDefault();
    const updatedPaymentMethod = {
      ...paymentMethod,
      title: title,
      stripe_account_id: stripeAccountId,
      stripe_payment_method_id: stripePaymentMethodId,
    };
    const response = await fetch(
      `http://127.0.0.1:8000/api/paymentmethods/${paymentMethod.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify(updatedPaymentMethod),
      }
    );
    if (response.ok) {
      onSave(updatedPaymentMethod);
    } else if (response.status === 401) {
      logoutUser();
    }
  };

  const handleDelete = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/paymentmethods/${paymentMethod.id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );
    if (response.ok) {
      onDelete(paymentMethod);
    } else if (response.status === 401) {
      logoutUser();
    }
  };

  return (
    <div className="mx-8 md:ml-8 md:mr-4 relative overflow-x-auto shadow-xl border border-gray-100 rounded-lg ">
      <form onSubmit={handleSave} className="bg-white shadow-md rounded-lg">
        <h1 className="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
          Edit Payment Method
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
              Save
            </button>
            <button
              onClick={onCancel}
              className="bg-[#9578ff] hover:bg-[#6551b0] text-white font-medium py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(paymentMethod.id)}
              className="bg-[#9578ff] hover:bg-[#6551b0] text-white mx-4 font-medium py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPaymentMethod;
