import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './Pages/HomePage'
import CheckoutPage from './Pages/CheckoutPage'
import MensPage from './Pages/MensPage'
import WomensPage from './Pages/WomensPage'
import Login from './Components/Login'
import toast from 'react-hot-toast'
import Register from './Components/Register'
import ProductManagement from './Pages/ProductManagement'
import Search from './Pages/Search';
import ProductDetail from './Pages/ProductDetail';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mens" element={<MensPage />} />
        <Route path="/womens" element={<WomensPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/products" element={<ProductManagement />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </div>
  )
}

export default App
