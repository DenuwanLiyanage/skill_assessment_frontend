import React from "react";
import { useNavigate } from 'react-router-dom';

function LogOut() {

    const navigate = useNavigate();
    const handleLogOut = (event) =>{
        event.preventDefault();
        localStorage.removeItem('token');
        navigate('/');


    } 
    
    return(
        <div className="origin-top-right">
            <button type="click" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/5  px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={ handleLogOut
                }>Log Out</button>
        </div>
    )
}

export default LogOut;