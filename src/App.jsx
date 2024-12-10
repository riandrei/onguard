import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Nav from './components/Nav'
import Landing from "./pages/Landing"
import Profile from "./pages/Profile"
import Admin from './pages/Admin'

const App  = ()=> {

  const [navCount, setNavCount] = useState(0)
  const handleNavClick = (value) => {
    setNavCount(value)
  }

  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<Landing navCount={navCount} handleNavClick={handleNavClick} />}/>
            <Route path="/Profile" element={<Profile/>} />
            <Route path="/Admin" element={<Admin/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
