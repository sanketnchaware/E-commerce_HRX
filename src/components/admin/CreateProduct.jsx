import React from "react";
import Form from "./Form";
import { useParams } from "react-router-dom";
const CreateProduct = () => {
  const { id } = useParams();
  console.log("id:", id);
  return (
    <div>
      <Form id={id} />
    </div>
  );
};

export default CreateProduct;
