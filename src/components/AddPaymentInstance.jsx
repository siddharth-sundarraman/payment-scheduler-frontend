import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const AddPaymentInstance = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientStripeId, setRecipientStripeId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { authTokens, logoutUser } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      "http://127.0.0.1:8000/api/paymentinstances/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify({
          title,
          recipient_email: recipientEmail,
          recipient_stripe_id: recipientStripeId,
          payment_method: paymentMethod,
          amount: amount,
          start_date: startDate,
          end_date: endDate,
        }),
      }
    );
    const data = await response.json();

    if (response.ok) {
      onAdd(data);
      setTitle("");
      setrecipientEmail("");
      setrecipientStripeId("");
      setPaymentMethod("");
      setAmount("");
      setStartDate(new Date());
      setEndDate(new Date());
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <div className="mx-8 my-8 relative overflow-x-auto shadow-xl border border-gray-100 rounded-lg">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-sm shadow-md rounded-lg"
      >
        <h1 className="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
          Add Payment Instance
        </h1>
        <div className="flex whitespace-nowrap  mb-4 px-4">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            onChange={(event) => setTitle(event.target.value)}
            className="form-input block mr-10 py-1.5 px-4 w-[200px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:border-[#9578ff] focus:outline-none"
            required
          />
          <input
            type="text"
            id="recipient email"
            name="recipient email"
            placeholder="Recipient Email"
            onChange={(event) => setRecipientEmail(event.target.value)}
            className="form-input block mr-10 py-1.5 px-4 w-[250px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:border-[#9578ff] focus:outline-none"
            required
          />

          <input
            type="text"
            id="recipient stripe id"
            name="recipient stripe id"
            placeholder="Recipient Stripe ID"
            onChange={(event) => setRecipientStripeId(event.target.value)}
            className="form-input block mr-10 py-1.5 px-4 w-[250px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:border-[#9578ff] focus:outline-none"
            required
          />
        </div>
        <div className="flex whitespace-nowrap  mb-4 px-4">
          <input
            type="text"
            id="payment method"
            name="payment method"
            placeholder="Payment Method"
            onChange={(event) => setPaymentMethod(event.target.value)}
            className="form-input block mr-10 py-1.5 px-4 w-[200px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:border-[#9578ff] focus:outline-none"
            required
          />
          <input
            type="text"
            id="amount"
            name="amount"
            placeholder="Amount"
            onChange={(event) => setAmount(event.target.value)}
            className="form-input block mr-10 py-1.5 px-4 w-[100px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:border-[#9578ff] focus:outline-none"
            required
          />

          <ReactDatePicker
            className="form-input block mr-10 py-1.5 px-4 w-[120px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:border-[#9578ff] focus:outline-none"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />

          <ReactDatePicker
            className="form-input block mr-10 py-1.5 px-4 w-[120px] font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:border-[#9578ff] focus:outline-none"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
        <div className="grid md:grid-cols-2 justify-between pb-4">
          <div className="flex my-4 h-10 md:my-0 ">
            <button
              type="submit"
              className="bg-[#9578ff] hover:bg-[#6551b0]  text-white font-medium py-2 px-4 ml-4 mr-14 rounded"
            >
              Add Payment Instance
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

export default AddPaymentInstance;
