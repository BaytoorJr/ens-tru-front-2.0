import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authorizationSlice';
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutBtn = () => {
        dispatch(logout())
        navigate('/')
    }
    
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
        <Button
            onClick={logoutBtn}
        >
            LogOut
        </Button>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
