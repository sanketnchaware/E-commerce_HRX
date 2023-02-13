import { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

function Pay({ total, MakePayment }) {
  const [amount, setAmount] = useState(total);

  const handleToken = async (token) => {
    axios
      .post(
        "http://localhost:5000/payment/donate",
        {
          token,
          amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        response.json();
        MakePayment();
      })
      .catch((error) => {
        MakePayment();
      });
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
  };

  return (
    <div className="">
      <FormControl sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          value={amount}
          onChange={handleAmountChange}
          startAdornment={<InputAdornment position="start">₹</InputAdornment>}
          label="Amount"
        />
      </FormControl>
      <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_KEY || ""}
        token={handleToken}
        name=""
        panelLabel={`Pay`}
        currency="INR"
        amount={amount * 100}
      ></StripeCheckout>
    </div>
  );
}

export default Pay;
