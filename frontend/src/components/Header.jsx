import { Link, useLocation} from 'react-router-dom';
import logo from '../images/mesto-logo.svg';
import { useContext } from 'react';
import CurrentUserContext from '../contexts/user/CurrentUserContext';
function Header({onSignOut }) {
  const loc = useLocation();
  const link = loc.pathname === '/signup' ? 'signin' : 'signup';
  const linkText = loc.pathname === '/signup' ? 'Вход' : 'Регистрация';
  const {email} = useContext(CurrentUserContext)

  function handleSignOut(){
    onSignOut()
  }

  return (
    <header className="header content__header">
      <Link to='/'><img alt="логотип место" className="logo header__logo" src={logo} /></Link>
      {email ? (
        <div className="header__user-area ">
          <span className="header__user-info">{email}</span>
          <span className='header__button opacity' onClick={handleSignOut}>Выйти</span>
        </div>
      ) : (
        <Link to={link} className='header__button opacity'>{linkText}</Link>
      )}
    </header>
  );
}

export default Header;
