import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { Home } from "./pages/Home"
import { Register } from "./pages/Register"
import { CreateRecipe } from "./pages/createRecipe"
import { Navbar } from "./components/navbar/navbar.jsx"
import ProfileTab from "./pages/profile.jsx"

import "./App.css"


function App() {
  return (
    <div className="App">
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/createRecipe" element={<CreateRecipe/>}/>
                <Route path="/Register" element={<Register/>}/>
                <Route path="/Profile" element ={<ProfileTab/>}/>
            </Routes>
            
        </Router>
    </div>
  )
}

export default App
