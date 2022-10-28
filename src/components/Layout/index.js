import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="container">
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <Link to="/" className="btn btn-outline-primary">
          Главная
        </Link>
        <Link to="/newCodes" className="btn btn-outline-primary">
          Новые коды
        </Link>
        <Link to="/categories" className="btn btn-outline-primary">
          Категории
        </Link>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
