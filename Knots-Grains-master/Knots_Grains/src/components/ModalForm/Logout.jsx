import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from "../../store/Authslice"; 

function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout()); // clears Redux auth state
        console.log("Logged out successfully");
        navigate("/"); // redirect to home page
    }

    return (
        <button 
            onClick={handleLogout}
            className="px-4 py-2 border border-yellow-500 text-yellow-600 rounded-md hover:bg-yellow-50 transition"
        >
            Logout
        </button>
    );
}

export default Logout;
