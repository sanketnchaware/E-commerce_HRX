import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center rounded-xl bg-white text-black px-4 py-2">
      <div>
        <Link className="text-4xl" to="/">
          HRX
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/products">Products </Link>
        <Link to="/cart">My Cart </Link>

        <img
          className=" cursor-pointer h-4 w-4"
          src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Navbar;
