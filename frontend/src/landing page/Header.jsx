import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <header className="header bg-dark text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="m-0">Mentor Connect</h1>
        <nav>
          <ul className="nav">
            <li className="nav-item">
              <Link className="btn btn-outline-light mx-2" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-outline-light" to="/admin/login">Admin</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
