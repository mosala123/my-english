'use client'
import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { CiSearch, CiUser } from "react-icons/ci";
import { IoSettingsOutline, IoBookOutline, IoMenu, IoClose } from "react-icons/io5";
import "./HeaderStyle.css";

const HeaderPages = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  };

  const isLoggedIn = false;
  const userLevel = "B1";

  return (
    <>
      <header className="header">
        <div className="header-container">
          
          {/* Logo */}
          <Link href="/" className="logo">
            <Image src="/logo.svg" alt="English Master Logo" width={40} height={40} />
            <span className="logo-text">EnglishMaster</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <Link href="/learn">Learn</Link>
            <Link href="/vocabulary">Vocabulary</Link>
            <Link href="/assessment">Assessment</Link>
            {/* <Link href="/grammer">grammer</Link> */}
            {/* <Link href="/marketing">marketing</Link> */}
            <Link href="/speaking">Speaking</Link>
            <Link href="/videos">Videos</Link>
            <Link href="/practice">Practice</Link>
          </nav>

          {/* Right Section */}
          <div className="header-right">
            
            {/* Search Bar - Desktop Only */}
            <div className="search-box">
              <CiSearch className="search-icon" />
              <input type="text" placeholder="Search..." />
            </div>

            {/* User Section */}
            {isLoggedIn ? (
              <div className="user-menu">
                <button onClick={toggleUserMenu} className="user-btn">
                  <div className="user-avatar">
                    <CiUser />
                  </div>
                  <span className="user-name">User</span>
                </button>

                {userMenuOpen && (
                  <div className="dropdown-menu">
                    <Link href="/profile" onClick={closeMenus}>
                      <CiUser />
                      Profile
                    </Link>
                    <Link href="/my-progress" onClick={closeMenus}>
                      <IoBookOutline />
                      My Progress
                    </Link>
                    <Link href="/settings" onClick={closeMenus}>
                      <IoSettingsOutline />
                      Settings
                    </Link>
                    <hr />
                    <button className="logout-btn">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link href="/auth/login" className="login-btn">Login</Link>
                <Link href="/auth/signup" className="signup-btn">Sign Up</Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button className="mobile-menu-btn" onClick={toggleMenu}>
              {menuOpen ? <IoClose /> : <IoMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}>
          <nav className="mobile-nav">
            <Link href="/" onClick={closeMenus}>Home</Link>
            <Link href="/learn" onClick={closeMenus}>Learn</Link>
            <Link href="/vocabulary" onClick={closeMenus}>Vocabulary</Link>
            <Link href="/videos" onClick={closeMenus}>Videos</Link>
            <Link href="/practice" onClick={closeMenus}>Practice</Link>
            
            {/* Mobile Search */}
            <div className="mobile-search">
              <CiSearch />
              <input type="text" placeholder="Search..." />
            </div>

            {/* Mobile Auth */}
            {!isLoggedIn && (
              <div className="mobile-auth">
                <Link href="/login" onClick={closeMenus} className="mobile-login">Login</Link>
                <Link href="/signup" onClick={closeMenus} className="mobile-signup">Sign Up</Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Add space for fixed header */}
      <div className="header-spacer"></div>
    </>
  );
};

export default HeaderPages;