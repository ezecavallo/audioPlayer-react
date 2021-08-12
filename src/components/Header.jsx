import React from 'react';
import {Link} from 'react-router-dom';
import Search from './Search';
import '../assets/styles/components/Header.css';

const Header = (props) => (
  <header className="header">
    <nav className="nav">
      <a className="nav__back_button" href=""><span className="nav__back_button--icon"></span> Back</a>
    </nav>
    <Search />
    <div className="header__menu">
      <div className="header__menu--profile">
        <img src="" alt="" />
        <Link to="/login">{props.user.username}</Link>
      </div>
      <ul>
        <li><a href=""></a></li>
        <li><a href=""></a></li>
      </ul>
    </div>
  </header>
);

export default Header;