import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import IndustryPage from './pages/IndustryPage'
import AdminPage from './pages/AdminPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/:industry" element={<IndustryPage />} />
    </Routes>
  )
}

export default App
