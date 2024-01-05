import { NavLink } from 'react-router-dom';
import './Nav.scss';

function Nav() {
  

  return (
    <header className='header'>
      <NavLink to={'/'} className='header__logo'>
<h1 className='header__logo'>SUPcheck.</h1>

      </NavLink>
    </header>
  );
}

export default Nav;
