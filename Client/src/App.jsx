import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import MensPage from './Pages/MensPage'
import WomensPage from './Pages/WomensPage'
import Login from './Components/Login'
import toast from 'react-hot-toast'
import Register from './Components/Register'

const App = () => {
  return (
    <div>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mens" element={<MensPage />} />
      <Route path="/womens" element={<WomensPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </div>
  )
}

export default App
