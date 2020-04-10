import React, { useState } from 'react';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from 'react-icons/ai';

import settings from '../../settings';

import './styles.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuFold() {
    setIsMenuOpen(!isMenuOpen);
  }

  const menuIcon = isMenuOpen ? (
    <AiOutlineMenuFold size={32} />
  ) : (
    <AiOutlineMenuUnfold size={32} />
  );

  return (
    <header className="header-container">
      <div className="content">
        <h1>{settings.DASHBOARD_NAME}</h1>
      </div>
      <button onClick={handleMenuFold} type="button">
        {menuIcon}
      </button>
    </header>
  );
};

export default Header;
