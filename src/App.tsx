import React from "react";
import "./App.css";
import Index from "./pages";
import Navigation from "./components/molecules/Navigation";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/signup";
import EmailConfirmation from "./pages/confirm";
import Dashboard from "./pages/dashboard";
import Categories from "./components/molecules/dashboard/category/categories";
import AddCategory from "./components/molecules/dashboard/category/addCategory";
import ProductListPage from "./components/molecules/dashboard/product/Products";
import AddProduct from "./components/molecules/dashboard/product/AddProduct";
import Login from "./pages/Login";
import Catalog from "./pages/catalog";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/cart";
import Toolbar from "@mui/material/Toolbar";

function App() {
  const isDashboard = window.location.pathname.includes("dashboard");

  return (
    <div className="App">
      {!isDashboard ? <Navigation /> : null}
      {!isDashboard ? <Toolbar /> : null}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirm" element={<EmailConfirmation />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/catalogue" element={<Catalog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="*" element={<h1>Dashboard</h1>} />
          <Route path="category" element={<Categories />} />
          <Route path="addCategory" element={<AddCategory />} />
          <Route path="product" element={<ProductListPage />} />
          <Route path="addProduct" element={<AddProduct />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
