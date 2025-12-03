import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import MensPage from './Pages/MensPage'
import toast from 'react-hot-toast'

const App = () => {
  return (
    <div>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mens" element={<MensPage />} />
    </Routes>
    </div>
  )
}

export default App
