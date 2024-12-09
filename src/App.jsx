import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Nav from './components/Nav'
import Landing from "./pages/Landing"
import Profile from "./pages/Profile"

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
        </Routes>
      </Router>
    </div>
  )
}

export default App
