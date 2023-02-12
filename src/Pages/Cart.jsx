import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));

  const [cartItems, setCartItems] = useState([...cart]);
  console.log("cartItems:", cartItems);

  const Add = (prod) => {
    const index = cartItems.findIndex((item) => item.id === prod.id);

    const carttotset = [...cartItems];

    if (index !== -1) {
      carttotset[index].quantity++;
      setCartItems(carttotset);
    }
  };
  const Remove = (prod) => {
    const index = cartItems.findIndex((item) => item.id === prod.id);

    const carttotset = [...cartItems];

    if (prod.quantity === 1) {
      console.log("quantity:", prod.quantity);
      carttotset.splice(index, 1);
      setCartItems(carttotset);
      return;
    } else {
      carttotset[index].quantity--;
      setCartItems(carttotset);
    }
  };

  const CartTotal = () => {
    let total = 0;
    for (let key of cartItems) {
      //   console.log("key:", key);
      console.log('key["quantity"]:', key["quantity"]);
      console.log('key["price"]:', key["price"]);
      total = total + key["quantity"] * key["price"];
      console.log("total:", total);
    }
    localStorage.setItem("total", JSON.stringify(total));
    return total;
  };

  useMemo(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <div>
      <h1 className="p-4 text-2xl font-bold underline">My Cart</h1>

      <div className="  grid-cols-2 gap-4  grid sm:grid-cols-4">
        {cartItems?.map((item) => {
          return (
            <div className=" border-2 border-teal-700 rounded-xl p-4 flex flex-col gap-4 ">
              <p className="text-2xl ">{item.name}</p>
              <p className="text-2xl ">Rating:- {item.rating}</p>
              <img className=" w-full h-44" src={item.image} alt="prod_photo" />
              <div className="flex justify-between gap-4">
                <p className="text-2xl ">₹ {item.price}</p>
              </div>
              <div className="flex  gap-4">
                <button
                  onClick={() => {
                    Remove(item);
                  }}
                  className="text-2xl bg-green-500 px-2 py-1 rounded-xl"
                >
                  {" "}
                  {`-`}{" "}
                </button>
                <p
                  className="text-3xl text-ce
                "
                >
                  {item.quantity}
                </p>
                <button
                  onClick={() => {
                    Add(item);
                  }}
                  className="text-2xl bg-green-500 px-2 py-1 rounded-xl"
                >{`+`}</button>
              </div>
            </div>
          );
        })}
      </div>

      <br />
      <br />
      <br />
      <div className="flex flex-col gap-8">
        <h1 className="p-4 text-2xl font-bold underline border-y ">
          Price Details
        </h1>
        <div className=" w-1/2  m-auto flex flex-col gap-4">
          {cartItems.map((item) => {
            return (
              <div className="gap-4 flex justify-between">
                <p>
                  {item.name} × {item.quantity}
                </p>
                <p>{item.quantity * item.price}</p>
              </div>
            );
          })}
          <hr />

          <div>
            <div className="flex gap-4 justify-between">
              <p>Total</p>
              <p>{CartTotal()}</p>
            </div>
            <br />
            <div className="bg-black p-4 rounded-xl text-center">
              <Link to="/address-info" className="text-xl ">
                Confirm and Fill Address {">>"}{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
