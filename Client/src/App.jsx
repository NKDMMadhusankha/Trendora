import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './Pages/HomePage'
import AccountPage from './Pages/AccountPage'
import CheckoutPage from './Pages/CheckoutPage'
import MensPage from './Pages/MensPage'
import WomensPage from './Pages/WomensPage'
import KidsPage from './Pages/KidsPage'
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
        <Route path="/kids" element={<KidsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/products" element={<ProductManagement />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </div>
  )
}

export default App
