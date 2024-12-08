import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Nav from './components/Nav'
import Landing from "./pages/Landing"

const App  = ()=> {
  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<Landing />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
