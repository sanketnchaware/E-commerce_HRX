import axios from "axios";
import React, { useEffect, useState } from "react";

const OrdersList = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  console.log("orders:", orders);

  const getOrders = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:5000/orders`)
      .then((response) => {
        console.log("response:", response);
        setLoading(false);
        const { data } = response.data;
        setOrders(data);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error:", error);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div>
      <h1 className="p-4 text-2xl font-bold underline">All Products</h1>

      <div>
        {orders?.map((item) => {
          return (
            <details className="my-4 border-b bg-red-100  border-emerald-900">
              <summary>
                {" "}
                <span className="text-xl">Customer</span>:-{" "}
                <p className="text-2xl inline-block">{item?.customer}</p>
              </summary>

              <p>
                {item?.items?.map((item) => {
                  return (
                    <div className="grid grid-cols-5 gap-5 p-4 bg-white border-b border-emerald-600 ">
                      <div className="flex">
                        <p>name:- </p>
                        <p>{item.name}</p>
                      </div>

                      <img src={item.image} alt="" />

                      <div className="flex">
                        {" "}
                        <p>rating</p>
                        <p>{item?.rating}</p>
                      </div>
                      <div className="flex">
                        {" "}
                        <p>price :</p>
                        <p>{item?.price}</p>
                      </div>
                      <div className="flex">
                        {" "}
                        <p>quantity :</p>
                        <p>{item?.quantity}</p>
                      </div>
                    </div>
                  );
                })}
              </p>
            </details>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersList;
