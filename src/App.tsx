import React from "react";
import "./App.css";
import Index from "./pages";
import Navigation from "./components/molecules/Navigation";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
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
import EditProducts from "./components/molecules/dashboard/product/editProducts";
import Users from "./components/molecules/dashboard/users";
import Stat from "./components/molecules/dashboard/stat";
import {useSelector} from "react-redux";
import {RootState} from "./store/store";
import NotFound from "./components/molecules/error/notFound";
import Footer from "./components/molecules/home/Footer";

function App() {
    const isDashboard = window.location.pathname.includes("dashboard");
    const isConnected = useSelector((state: RootState) => state.user.user.isLogged);
    const isAdmin = useSelector((state: RootState) => state.user.user.isAdmin);
    const navigate = useNavigate();

    return (
        <div className='App'>
            {!isDashboard ? <Navigation/> : null}
            {!isDashboard ? <Toolbar/> : null}
            <Routes>
                <Route path='/' element={<Index/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/confirm' element={<EmailConfirmation/>}/>
                <Route path='/product/:id' element={<ProductDetail/>}/>
                <Route path='/catalogue' element={<Catalog/>}/>
                <Route path='/cart' element={<Cart/>}/>
                {
                    isConnected && isAdmin ?
                        <Route path='/dashboard' element={<Dashboard/>}>
                            <Route path='' element={<Stat/>}/>
                            <Route path='category' element={<Categories/>}/>
                            <Route path='addCategory' element={<AddCategory/>}/>
                            <Route path='product' element={<ProductListPage/>}/>
                            <Route path='product/add' element={<AddProduct/>}/>
                            <Route path='editProduct/:id' element={<EditProducts/>}/>
                            <Route path='users' element={<Users/>}/>
                        </Route>
                        : <Route path='/dashboard' element={<NotFound/>}/>
                }
            </Routes>
            {
                !isDashboard ? <Footer/> : null
            }
        </div>
    );
}

export default App;
