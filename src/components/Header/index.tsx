import React from 'react';
import './style.css';
import headerLogo from '../../assets/Header/header-logo.svg';
import bookmark from '../../assets/Header/bookmark.svg';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <section className="header__container">
        <div className="header__logo">
          <a href="/" className="header__logo-link">
            <img
              className="header__logo-icon"
              src={headerLogo}
              alt="logo-museum"
            />
          </a>
        </div>
        <div
          className="header__favorites"
          onClick={() => navigate('/favorites/')}
        >
          <img className="header__bookmark" src={bookmark} alt="bookmark" />
          <span>Your favorites</span>
        </div>
      </section>
    </header>
  );
};

export default Header;
