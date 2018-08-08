import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import logo from '../../assets/Header/logo1_gray.png';

class Header extends Component {
  render() {
    return (
      <header>
        <nav className="nav">
          <ul className="ul">
            <li className="li">
              <Link className="liBtn" to="/">
                <div className="logo-wrapper">
                  <img src={logo} alt="chernyshov-logo" className="logo" />
                </div>
              </Link>
            </li>
            <li className="li">
              <Link className="liBtn" to="/">
                Магазин
              </Link>
            </li>
            <li className="li">
              <Link className="liBtn" to="/about">
                O Store
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
