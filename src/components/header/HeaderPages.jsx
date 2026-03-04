'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { CiUser, CiBookmark, CiSettings } from 'react-icons/ci';
import {
  IoBookOutline,
  IoMenu,
  IoClose,
  IoLogOutOutline,
  IoStatsChartOutline,
  IoVideocamOutline,
  IoMicOutline,
  IoSchoolOutline,
  IoHomeOutline,
  IoChevronDown,
  IoTrophyOutline,
  IoFlameOutline
} from 'react-icons/io5';
import './HeaderStyle.css';

const HeaderPages = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  const isLoggedIn = Boolean(user);
  const userLevel = user?.level || 'A1';
  const userPoints = user?.stats?.xp || 0;
  const userStreak = 7;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    try {
      setUser(userData ? JSON.parse(userData) : null);
    } catch {
      setUser(null);
    }
  }, [pathname]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (userMenuOpen) setUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    closeMenus();
    router.push('/auth/login');
  };

  const navLinks = [
    { name: 'الرئيسية', href: '/', icon: IoHomeOutline },
    { name: 'التعلم', href: '/learn', icon: IoSchoolOutline },
    { name: 'المفردات', href: '/vocabulary', icon: IoBookOutline },
    { name: 'القواعد', href: '/grammar', icon: IoStatsChartOutline },
    { name: 'الفيديوهات', href: '/videos', icon: IoVideocamOutline },
    { name: 'المحادثة', href: '/speaking', icon: IoMicOutline },
    { name: 'التدريب', href: '/practice', icon: IoTrophyOutline }
  ];

  return (
    <>
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="header-container">

          {/* Logo */}
          <Link href="/" className="logo" onClick={closeMenus}>
            <div className="logo-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="logo-texts">
              <span className="logo-text">English<strong>Master</strong></span>
              <span className="logo-tagline">تعلّم بذكاء</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link key={link.href} href={link.href} className={`nav-link ${isActive ? 'active' : ''}`}>
                  <Icon className="nav-icon" />
                  <span>{link.name}</span>
                  {isActive && <span className="active-dot" />}
                </Link>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="header-right">
            {isLoggedIn ? (
              <div className="logged-in-actions">
                {/* Streak Badge */}
                <div className="streak-badge">
                  <IoFlameOutline className="streak-icon" />
                  <span>{userStreak}</span>
                </div>

                <div className="user-menu-container">
                  <div className="profile-nav-wrap">
                    <Link href="/profile" className="profile-nav-btn" onClick={closeMenus} aria-label="الملف الشخصي">
                      <CiUser />
                    </Link>
                  </div>
                  <button onClick={toggleUserMenu} className="user-btn">
                    <div className="user-avatar">
                      <CiUser />
                    </div>
                    <div className="user-info">
                      <span className="user-name">{user?.name || 'مستخدم'}</span>
                      <span className="user-level-badge">{userLevel}</span>
                    </div>
                    <IoChevronDown className={`dropdown-arrow ${userMenuOpen ? 'rotate' : ''}`} />
                  </button>

                  {userMenuOpen && (
                    <div className="dropdown-menu">
                      <div className="dropdown-header">
                        <div className="dropdown-avatar">
                          <CiUser />
                        </div>
                        <div>
                          <p className="dropdown-name">{user?.name || 'مستخدم'}</p>
                          <p className="dropdown-email">{user?.email || ''}</p>
                        </div>
                      </div>

                      <div className="user-stats">
                        <div className="stat-item">
                          <span className="stat-value">{userLevel}</span>
                          <span className="stat-label">المستوى</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                          <span className="stat-value">{userPoints.toLocaleString()}</span>
                          <span className="stat-label">النقاط</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                          <span className="stat-value">{userStreak} 🔥</span>
                          <span className="stat-label">سلسلة</span>
                        </div>
                      </div>

                      <div className="dropdown-links">
                        <Link href="/profile" onClick={closeMenus}>
                          <CiUser />
                          <span>الملف الشخصي</span>
                        </Link>
                        <Link href="/my-progress" onClick={closeMenus}>
                          <IoStatsChartOutline />
                          <span>تقدمي</span>
                        </Link>
                        <Link href="/saved" onClick={closeMenus}>
                          <CiBookmark />
                          <span>المحفوظات</span>
                        </Link>
                        <Link href="/settings" onClick={closeMenus}>
                          <CiSettings />
                          <span>الإعدادات</span>
                        </Link>
                      </div>

                      <div className="dropdown-footer">
                        <button className="logout-btn" onClick={handleLogout}>
                          <IoLogOutOutline />
                          <span>تسجيل الخروج</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link href="/auth/login" className="login-btn">
                  <CiUser className="login-icon" />
                  دخول
                </Link>
                <Link href="/auth/signup" className="signup-btn">
                  ابدأ مجاناً ✦
                </Link>
              </div>
            )}

            <button
              className="mobile-menu-btn"
              onClick={toggleMenu}
              aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            >
              {menuOpen ? <IoClose /> : <IoMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}>
          <div className="mobile-menu-inner">
            {/* Mobile Nav Links */}
            <nav className="mobile-nav">
              <p className="mobile-section-title">القائمة الرئيسية</p>
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href} className={`mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMenus}>
                    <div className="mobile-nav-icon-wrap">
                      <Icon className="nav-icon" />
                    </div>
                    <span>{link.name}</span>
                    {isActive && <span className="mobile-active-pill">الآن</span>}
                  </Link>
                );
              })}
            </nav>

            {!isLoggedIn ? (
              <div className="mobile-auth">
                <p className="mobile-section-title">الحساب</p>
                <Link href="/auth/login" onClick={closeMenus} className="mobile-login">
                  تسجيل الدخول
                </Link>
                <Link href="/auth/signup" onClick={closeMenus} className="mobile-signup">
                  إنشاء حساب مجاني ✦
                </Link>
              </div>
            ) : (
              <div className="mobile-user-section">
                <p className="mobile-section-title">حسابي</p>
                <div className="mobile-user-links">
                  <Link href="/profile" onClick={closeMenus}>
                    <CiUser /> الملف الشخصي
                  </Link>
                  <Link href="/settings" onClick={closeMenus}>
                    <CiSettings /> الإعدادات
                  </Link>
                  <button className="mobile-logout" onClick={handleLogout}>
                    <IoLogOutOutline /> تسجيل الخروج
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {menuOpen && <div className="mobile-menu-overlay" onClick={closeMenus} />}
      </header>

      <div className="header-spacer"></div>
    </>
  );
};

export default HeaderPages;
