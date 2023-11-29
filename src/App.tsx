import React from 'react'
import './App.css'
import Index from './pages'
import Navigation from './components/molecules/Navigation'
import {Routes, Route} from 'react-router-dom'
import SignUp from './pages/signup'
import EmailConfirmation from './pages/confirm'
import Dashboard from './pages/dashboard'
import Categories from './components/molecules/dashboard/product/category/categories'
import AddCategory from './components/molecules/dashboard/product/category/addCategory'
import ProductListPage from "./components/molecules/dashboard/product/Products";
import AddProduct from "./components/molecules/dashboard/product/AddProduct";
import Login from "./pages/Login";
import Catalog from "./pages/catalog";

function App() {

	const isDashboard = window.location.pathname.includes('dashboard')

	return (
		<div className='App'>
			{isDashboard ? <Navigation/> : null}

			<Routes>
				<Route path='/' element={<Index/>}/>
				<Route path='/signup' element={<SignUp/>}/>
				<Route path='/login' element={<Login/>}/>
				<Route path='/confirm' element={<EmailConfirmation/>}/>
				<Route path='/catalogue' element={<Catalog/>}/>
				<Route path='/dashboard' element={<Dashboard/>}>
					<Route path='*' element={<h1>Dashboard</h1>}/>
					<Route path='category' element={<Categories/>}/>
					<Route path='addCategory' element={<AddCategory/>}/>
					<Route path='product' element={<ProductListPage/>}/>
					<Route path='addProduct' element={<AddProduct/>}/>
				</Route>
			</Routes>
		</div>
	)
}

export default App
