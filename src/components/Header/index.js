import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';

import settings from '../../settings';

import './styles.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuFold = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuIcon = isMenuOpen ? <AiOutlineMenuFold size={32} /> : <AiOutlineMenuUnfold size={32} />;

  return (
    <header className="header-container">
      <div className="content">
        <h1>{settings.DASHBOARD_NAME}</h1>
      </div>
      <div className="left-button-container">
        <button className="button" onClick={handleMenuFold} type="button">
          {menuIcon}
        </button>
        <Link className="button-link" to="/">
          <AiOutlineHome size={32} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
