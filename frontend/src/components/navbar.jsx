import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FaSearch } from "react-icons/fa";



export const Navbar = () => {
    return (
        <div className='flex justify-between items-center text-xl text-pink-900 p-7 flex-grow font-mono'>
            <div></div>
            <div className='flex items-center space-x-4'>
                <img src={Logo} className='w-28 h-24 pr-4' />
                <Link to="/" className=''>Home</Link>
                <Link to="/createRecipe" className=''>Add Recipes</Link>
                <Link to="/Register" className=''>Login/SignUp</Link>
            </div>
            <div className='search-box'>
                <div className='flex items-center border-2 border-pink-900 rounded-full pr-2'>
                    <input type='text' placeholder=' Search Recipe' className='outline-none bg-transparent' />
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>
        </div>

    );
};
