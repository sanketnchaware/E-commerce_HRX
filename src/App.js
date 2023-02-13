import { Routes, Route, useLocation, Link } from "react-router-dom";
import Payment from "./Pages/Payment";
import AdressInformation from "./Pages/AdressInformation";
import Cart from "./Pages/Cart";
import Products from "./Pages/Products";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./Pages/Dashboard";
import ProductList from "./components/admin/ProductList";
import CreateProduct from "./components/admin/CreateProduct";
import OrdersList from "./components/admin/OrdersList";
import Pay from "../src/Pages/Pay.jsx";

function App() {
  const { pathname } = useLocation();
  console.log("pathname:", pathname);

  return (
    <div className="p-4">
      {!pathname?.includes("admin") ? (
        <Navbar />
      ) : (
        <div className="flex justify-between items-center rounded-xl bg-white text-black px-4 py-2">
          <div>
            <Link className="text-4xl" to="/admin-dashboard">
              Admin Panel
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin-products"> Products</Link>
            <Link to="/admin-orders"> Orders</Link>
          </div>
        </div>
      )}
      <Routes>
        {/* Routes for Customer */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address-info" element={<AdressInformation />} />
        <Route path="/payment" element={<Payment />} />

        {/* Routes for Admin Panel */}
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/admin-products" element={<ProductList />} />
        <Route path="/admin-view-product/:id" element={<CreateProduct />} />
        <Route path="/admin-create-product" element={<CreateProduct />} />
        <Route path="/admin-edit-product/:id" element={<CreateProduct />} />

        <Route path="/admin-orders" element={<OrdersList />} />
      </Routes>
    </div>
  );
}

export default App;
