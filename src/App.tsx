import React from 'react'
import './App.css'
import Index from './pages'
import Navigation from './components/molecules/Navigation'
import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/signup'
import EmailConfirmation from './pages/confirm'
import Dashboard from './pages/dashboard'
import Categories from './components/molecules/dashboard/product/category/categories'
import AddCategory from './components/molecules/dashboard/product/category/addCategory'

function App() {
    return (
        <div className='App'>
            <Navigation />
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/confirm' element={<EmailConfirmation />} />
                <Route path='/dashboard' element={<Dashboard />}>
                    <Route path='*' element={<h1>Dashboard</h1>} />
                    <Route path='category' element={<Categories />} />
                    <Route path='addCategory' element={<AddCategory />} />
                </Route>
                <Route path='*' element={<h1>404</h1>} />
            </Routes>
        </div>
    )
}

export default App
