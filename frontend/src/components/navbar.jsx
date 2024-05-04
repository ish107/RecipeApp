import { Link , useNavigate} from 'react-router-dom';
import Logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {useCookies} from 'react-cookie';
import "../styles/navbar.css"



export const Navbar = () => {
    const [cookies, setCookies]= useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout =()=>{
        console.log("logging out")
        setCookies("access_token","");  //clear acces toke cookie
        window.localStorage.clear();  //clear stored data from local storage
        navigate("/Register");   //navigate to login/signup
    }
    return (
        <div className='navbar' id='Topnav'>
            <img src={Logo}  className='logo'/>
            <div className='mobile'><a href="#" className="icon" onClick={ressponsiveNav}>&#9776;</a></div>
            <ul>
                <li><Link to="/" className='home'>Home</Link></li>
                <li><Link to="/createRecipe" className='recipe hide-on'>Add Recipes</Link></li>
                {!cookies.access_token ?(
                        <li><Link to="/Register" className='register hide-on'>Login/SignUp</Link></li>
                    ):(
                        <button onClick={logout}>Logout</button>
                    )}

            </ul>
            
            <div className='search-bar'>
                <input type='text' placeholder=' Search Recipe' className='input-text' />
                <button className='search-icon'><FontAwesomeIcon icon={faSearch} /></button>
            </div>      
        </div>

    );
};

function ressponsiveNav() {
    var x = document.getElementById("Topnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  
