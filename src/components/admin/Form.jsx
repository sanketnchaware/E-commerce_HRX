import axios from "axios";
import React, { useMemo, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const CreateForm = ({ id }) => {
  const { state } = useLocation();
  console.log("state:", state);
  const navigate = useNavigate();
  const fields = {
    name: "",
    image: "",
    rating: "",
    price: "",
  };
  const [params, setParams] = useState(fields);
  console.log("params:", params);

  const postdata = {
    ...params,
    rating: +params.rating,
    price: +params.price,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("value:", value);
    setParams({ ...params, [name]: value });
  };

  const CreateProduct = async (e) => {
    e.preventDefault();
    console.log(postdata, "params");

    if (id) {
      await axios
        .patch(`http://localhost:5000/products/${id}`, postdata)
        .then((response) => {
          swal("Product Edited");
          navigate("/admin-products");
          console.log("response:", response);
        })
        .catch((error) => {
          console.log("error:", error);
        });
    } else {
      await axios
        .post(`http://localhost:5000/products`, postdata)
        .then((response) => {
          swal("Product Created");
          navigate("/admin-products");
          console.log("response:", response);
        })
        .catch((error) => {
          console.log("error:", error);
        });
    }
  };
  useMemo(() => {
    state &&
      setParams({
        name: state?.name,
        image: state?.image,
        rating: state?.rating,
        price: state?.price,
      });
  }, [id]);

  return (
    <div>
      <h1 className="p-4 text-2xl font-bold underline ">
        Edit and View Product
      </h1>
      <div>
        <form onSubmit={CreateProduct} className="flex flex-col gap-4">
          <input
            placeholder="Name"
            type="text"
            name="name"
            onChange={handleChange}
            value={params.name}
          />
          <p>
            Please put the image link here:
            (e.g:http://dummyimage.com/232x100.png/ff4444/ffffff)
          </p>
          <input
            placeholder="image"
            onChange={handleChange}
            name="image"
            value={params.image}
            type="text"
          />

          <img className="w-44 h-44" src={params?.image} alt="image prod" />

          <input
            placeholder="rating"
            onChange={handleChange}
            name="rating"
            value={params.rating}
            type="number"
          />

          <input
            placeholder="price"
            onChange={handleChange}
            name="price"
            value={params.price}
            type="number"
          />

          <button className="border px-4 py-2 rounded-xl w-fit bg-green-600 text-2xl text-white m-auto">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
