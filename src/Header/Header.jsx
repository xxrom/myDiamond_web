import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';
import logo from '../../assets/Header/blisterprom-0-white.png';

class Header extends Component {
  render() {
    return (
      <ul className="ul">
        <NavLink to="/" exact>
          <div className="logo-wrapper">
            <img src={logo} alt="blisterprom-logo" className="logo" />
          </div>
        </NavLink>

        <NavLink className="liBtn" to="/" exact activeClassName="active">
          Заказы
        </NavLink>

        <NavLink className="liBtn" to="/add-employee" activeClassName="active">
          Добавить сотрудника
        </NavLink>

        <NavLink
          className="liBtn"
          to="/employee-table"
          activeClassName="active"
        >
          Таблица сотрудников
        </NavLink>
      </ul>
    );
  }
}

export default Header;
