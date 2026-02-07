import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faBars,
  faXmark,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import ResponsiveWidthWrapper from "../ResponsiveWidthWrapper/ResponsiveWidthWrapper";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const cartItemCount = getItemCount();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
      navigate("/");
      closeMobileMenu();
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <>
      {/* Spacer due to fixed styling */}
      <div className="pt-20"></div>

      {/* Navbar */}
      <nav className="w-full py-1 bg-primary flex justify-center items-center shadow-lg fixed top-0 z-50">
        <ResponsiveWidthWrapper>
          <div className="w-full flex justify-between items-center text-light font-bold">
            {/* Logo */}
            <div className="flex">
              <NavLink
                to="/"
                className="text-light no-underline flex justify-center items-center"
                onClick={closeMobileMenu}
              >
                <img
                  src="/icons/maad-makes-logo-white.svg"
                  alt="Image of brand logo"
                  className="size-[70px]"
                />
              </NavLink>
            </div>

            {/* Desktop Navigation Links */}
            <ul className="hidden md:flex gap-2">
              <li className="list-none">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `text-light no-underline flex justify-center items-center p-4 rounded-xl transition-colors hover:bg-primary-lighter active:scale-95 ${
                      isActive ? "bg-primary-lighter" : ""
                    }`
                  }
                >
                  <p>Home</p>
                </NavLink>
              </li>
              <li className="list-none">
                <NavLink
                  to="/portfolio"
                  className={({ isActive }) =>
                    `text-light no-underline flex justify-center items-center p-4 rounded-xl transition-colors hover:bg-primary-lighter active:scale-95 ${
                      isActive ? "bg-primary-lighter" : ""
                    }`
                  }
                >
                  <p>Portfolio</p>
                </NavLink>
              </li>
              <li className="list-none">
                <NavLink
                  to="/store"
                  className={({ isActive }) =>
                    `text-light no-underline flex justify-center items-center p-4 rounded-xl transition-colors hover:bg-primary-lighter active:scale-95 ${
                      isActive ? "bg-primary-lighter" : ""
                    }`
                  }
                >
                  <p>Store</p>
                </NavLink>
              </li>
              <li className="list-none">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `text-light no-underline flex justify-center items-center p-4 rounded-xl transition-colors hover:bg-primary-lighter active:scale-95 ${
                      isActive ? "bg-primary-lighter" : ""
                    }`
                  }
                >
                  <p>Contact</p>
                </NavLink>
              </li>
            </ul>

            {/* Right Side Icons */}
            <ul className="flex gap-2">
              {/* Cart Icon */}
              <li className="list-none">
                <NavLink
                  to="/cart"
                  className="text-light no-underline flex justify-center items-center p-4 rounded-xl bg-primary-darker transition-colors hover:bg-primary-lighter aspect-square active:scale-95 relative"
                  onClick={closeMobileMenu}
                >
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="text-base"
                  />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </NavLink>
              </li>

              {/* User Icon / Menu */}
              <li className="list-none relative" ref={userMenuRef}>
                {currentUser ? (
                  <>
                    <button
                      onClick={toggleUserMenu}
                      className="text-light flex justify-center items-center p-4 rounded-xl bg-primary-darker transition-colors hover:bg-primary-lighter aspect-square active:scale-95"
                      title="User Menu"
                    >
                      <FontAwesomeIcon icon={faUser} className="text-base" />
                    </button>
                    {/* Dropdown Menu */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                        <NavLink
                          to="/profile"
                          className="block px-4 py-2 text-dark hover:bg-gray-100 transition-colors no-underline"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          My Profile
                        </NavLink>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-dark hover:bg-red-100 hover:text-red-600 transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    className="text-light no-underline flex justify-center items-center p-4 rounded-xl bg-primary-darker transition-colors hover:bg-primary-lighter aspect-square active:scale-95"
                    onClick={closeMobileMenu}
                  >
                    <FontAwesomeIcon icon={faUser} className="text-base" />
                  </NavLink>
                )}
              </li>

              {/* Hamburger Menu Button - Mobile Only */}
              <li className="list-none md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="text-light flex justify-center items-center p-4 rounded-xl bg-primary-darker transition-colors hover:bg-primary-lighter aspect-square active:scale-95"
                  aria-label="Toggle menu"
                >
                  <FontAwesomeIcon
                    icon={isMobileMenuOpen ? faXmark : faBars}
                    className="text-base"
                  />
                </button>
              </li>
            </ul>
          </div>
        </ResponsiveWidthWrapper>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-primary shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-4">
          <ul className="flex flex-col gap-2">
            <li className="list-none">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `text-light no-underline flex items-center p-4 rounded-xl transition-colors hover:bg-primary-lighter active:scale-95 text-lg ${
                    isActive ? "bg-primary-lighter" : ""
                  }`
                }
                onClick={closeMobileMenu}
              >
                <p>Home</p>
              </NavLink>
            </li>
            <li className="list-none">
              <NavLink
                to="/portfolio"
                className={({ isActive }) =>
                  `text-light no-underline flex items-center p-4 rounded-xl transition-colors hover:bg-primary-lighter active:scale-95 text-lg ${
                    isActive ? "bg-primary-lighter" : ""
                  }`
                }
                onClick={closeMobileMenu}
              >
                <p>Portfolio</p>
              </NavLink>
            </li>
            <li className="list-none">
              <NavLink
                to="/store"
                className={({ isActive }) =>
                  `text-light no-underline flex items-center p-4 rounded-xl transition-colors hover:bg-primary-lighter active:scale-95 text-lg ${
                    isActive ? "bg-primary-lighter" : ""
                  }`
                }
                onClick={closeMobileMenu}
              >
                <p>Store</p>
              </NavLink>
            </li>
            <li className="list-none">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-light no-underline flex items-center p-4 rounded-xl transition-colors hover:bg-primary-lighter active:scale-95 text-lg ${
                    isActive ? "bg-primary-lighter" : ""
                  }`
                }
                onClick={closeMobileMenu}
              >
                <p>Contact</p>
              </NavLink>
            </li>
            {currentUser && (
              <>
                <li className="list-none">
                  <NavLink
                    to="/profile"
                    className="text-light no-underline flex items-center p-4 rounded-xl transition-colors hover:bg-primary-lighter active:scale-95 text-lg"
                    onClick={closeMobileMenu}
                  >
                    <p>My Profile</p>
                  </NavLink>
                </li>
                <li className="list-none">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-light flex items-center p-4 rounded-xl transition-colors hover:bg-primary-lighter active:scale-95 text-lg"
                  >
                    <p>Logout</p>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
