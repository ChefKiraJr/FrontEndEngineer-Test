import React from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';
import { MdLogout } from 'react-icons/md';

const Header = ({ page }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <div className="header__container">
      <div className="header__menu">
        <div
          className={page === 'Home' ? 'active-header' : 'inactive-header'}
          onClick={() => navigate('/home')}
        >
          Home
        </div>
        <div
          className={page === 'Store' ? 'active-header' : 'inactive-header'}
          onClick={() => navigate('/store')}
        >
          Store
        </div>
        <div
          className={page === 'Cart' ? 'active-header' : 'inactive-header'}
          onClick={() => navigate('/cart')}
        >
          Shopping Cart
        </div>
      </div>
      <div className="header__logout" onClick={handleLogout}>
        <MdLogout
          style={{
            color: '#1a202c',
            marginRight: '4px',
          }}
        />
        Logout
      </div>
    </div>
  );
};

export default Header;
