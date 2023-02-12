import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, useParams } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useParams();

  const getProducts = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:5544/products?page=${page}`)
      .then((response) => {
        setLoading(false);
        const { data } = response.data;
        setProducts(data);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error:", error);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const DeleteProduct = async (id) => {
    await axios
      .delete(`http://localhost:5544/products/${id}`)
      .then((response) => {
        getProducts();
        swal("Product Deleted");

        console.log("response:", response);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="p-4 text-2xl font-bold underline">All Products</h1>
        <button className="bg-blue-400 active:bg-blue-500 rounded-lg px-4 py-2">
          <Link to="/admin-create-product/">Create Product</Link>
        </button>
      </div>

      <br />
      {loading ? (
        <p className="text-center  text-4xl">Loading...</p>
      ) : (
        <div className="  grid-cols-2 gap-4  grid sm:grid-cols-4">
          {products?.map((item) => {
            return (
              <div className=" border-2 border-teal-700 rounded-xl p-4 flex flex-col gap-4 ">
                <p className="text-2xl ">{item.name}</p>
                <p className="text-2xl ">Rating:- {item.rating}</p>
                <img
                  className=" w-full h-44"
                  src={item.image}
                  alt="prod_photo"
                />
                <div className="flex justify-between gap-4">
                  <p className="text-2xl ">₹ {item.price}</p>
                  <Link
                    state={item}
                    className="bg-blue-400 active:bg-blue-500 rounded-lg px-4 py-2"
                    to={`/admin-edit-product/${item._id}`}
                  >
                    Edit / View
                  </Link>
                  <button
                    onClick={() => {
                      DeleteProduct(item._id);
                    }}
                    className="bg-blue-400 active:bg-blue-500 rounded-lg px-4 py-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductList;
