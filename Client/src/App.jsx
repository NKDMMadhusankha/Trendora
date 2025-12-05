import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import MensPage from './Pages/MensPage'
import Login from './Components/Login'
import toast from 'react-hot-toast'
import Register from './Components/Register'
import OrderProfile from './Pages/OrderProfile'

const App = () => {
  return (
    <div>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mens" element={<MensPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/orders" element={<OrderProfile />} />
    </Routes>
    </div>
  )
}

export default App
