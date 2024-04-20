import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { Home } from "./pages/Home"
import { Register } from "./pages/Register"
import { CreateRecipe } from "./pages/createRecipe"
import { Navbar } from "./components/navbar.jsx"


function App() {
  return (
    <div className="App">
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/createRecipe" element={<CreateRecipe/>}/>
                <Route path="/Register" element={<Register/>}/>
            
            </Routes>
        </Router>
    </div>
  )
}

export default App
