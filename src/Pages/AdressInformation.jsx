import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdressInformation = () => {
  const fields = {
    phone: "",
    address: "",
    pincode: "",
  };
  const [params, setParams] = useState(fields);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("value:", value);
    setParams({ ...params, [name]: value });
  };
  return (
    <div>
      <h1 className="p-4 text-2xl font-bold underline ">Adress Information</h1>
      <div>
        <form className="flex flex-col gap-4">
          <input
            placeholder="Phone"
            type="number"
            name="phone"
            onChange={handleChange}
            min="1"
            max="10"
            value={params.phone}
          />

          <input
            placeholder="address"
            onChange={handleChange}
            name="address"
            value={params.address}
            type="text"
          />
          <input
            placeholder="pincode"
            type="number"
            name="pincode"
            min="1"
            max="6"
            onChange={handleChange}
            value={params.pincode}
          />
          <button className="border px-4 py-2 rounded-xl w-fit bg-green-600 text-2xl text-white m-auto">
            <Link state={params} to="/payment">
              Proceed to checkout
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdressInformation;
