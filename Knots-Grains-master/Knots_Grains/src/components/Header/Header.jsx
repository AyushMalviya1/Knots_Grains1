import React from "react";
import { useNavigate } from "react-router-dom";
import { useModalNavigation} from "../ModalForm/index";
import { useSelector, useDispatch } from "react-redux";
import authService from "../../AuthService/AuthService";
import Logout from "../ModalForm/Logout";

export const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const { openLogin, openSignup } = useModalNavigation(); 
 
    return (
        <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3063/3063192.png"
            alt="logo"
            className="w-8 h-8"
          />
          <h1 className="text-2xl font-bold text-yellow-600">CarpentryHub</h1>
        </div>
{!authStatus &&
        <nav className="hidden md:flex space-x-6 font-medium">
          <a href="#home" className="hover:text-yellow-600 transition">
            Home
          </a>
          <a href="#about" className="hover:text-yellow-600 transition">
            About
          </a>
          <a href="#contact" className="hover:text-yellow-600 transition">
            Contact
          </a>
        </nav>
}

        <div className="space-x-3">
        {authStatus ? (
  <Logout />
) : (
  <>
    <button
      onClick={openLogin}
      className="px-4 py-2 border border-yellow-500 text-yellow-600 rounded-md hover:bg-yellow-50 transition"
    >
      Login
    </button>
    <button
      onClick={openSignup}
      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
    >
      Sign Up
    </button>
  </>
)}

        </div>
      </header>
    )
}