import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import Pay from "./Pay";
const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const total = JSON.parse(localStorage.getItem("total"));
  const cart = JSON.parse(localStorage.getItem("cart"));
  console.log("cart:", cart);

  const MakePayment = async () => {
    const postdata = {
      items: cart,
      customer: +state.phone,
    };
    console.log("postdata:", postdata);

    await axios
      .post("http://localhost:5000/orders", postdata)
      .then((response) => {
        console.log("response:", response);
        localStorage.removeItem("total", "cart");
        swal("Thank you for ordering from HRX !");
        navigate("/products");
      })
      .catch((error) => {
        swal("Something went wrong. Please try again !");
        navigate("/products");
        console.log("error:", error);
      });
  };
  return (
    <div>
      <h1 className="p-4 text-2xl font-bold underline ">Payment</h1>

      <div className="flex flex-col gap-6">
        <div className="flex justify-evenly text-3xl">
          <p>Total Amount Need to Pay:</p>
          <p>₹ {total}</p>
        </div>
        <br />

        <button
          // onClick={MakePayment}
          className="border px-4 py-2 rounded-xl w-fit bg-green-600 text-2xl text-white m-auto"
        >
          <Pay MakePayment={MakePayment} total={total} />
        </button>
      </div>
    </div>
  );
};

export default Payment;
