import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/UserContext";
import logo from "../../images/Logo.svg";
import "./Header.css";
const Header = () => {
  const { user, userSignout } = useContext(AuthContext);
  return (
    <div>
      <nav className="header">
        <img src={logo} alt="" />
        <div>
          <Link to="/shop">Shop</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/about">About</Link>
          {user?.uid ? (
            <Link onClick={userSignout} to="/login">
              Logout
            </Link>
          ) : (
            <>
              <Link to="/login">Log In</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
          <span>{user?.email}</span>
        </div>
      </nav>
    </div>
  );
};

export default Header;
