import { NavLink } from 'react-router-dom';
import logo from "../../assets/logo/logo.png"
import './Nav.scss';

function Nav() {
  

  return (
    <header className='header'>
      <NavLink to={'/'} className='header__logo'>
          <img src="" alt="" srcset="" />
        <img className='header__logo' src={logo} alt="" />
      </NavLink>
    </header>
  );
}

export default Nav;
