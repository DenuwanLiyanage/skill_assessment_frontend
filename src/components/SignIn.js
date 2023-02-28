import Header from './Header'
import Footer from './Footer'
import React from "react";
import { useState } from 'react';
import axios from 'axios'

import { useNavigate } from 'react-router-dom';


const url = 'http://localhost:8086/clients/login'

function SignIn() {
    const navigate = useNavigate();
    const [userName, setuserName] = useState('');
    const [password, setpassword] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();

        axios.post(url, {
            username: userName,
            password: password
            },{
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(function (response) {
                if(response.status===200){
                    var token = response.data
                    console.log(`Success {}`,response.data);
                    localStorage.setItem("token", token);
                    navigate('/home');
                }
            console.log(response);
            })
            .catch(function (error) {
            console.log(error);
            });
       
        setuserName('');
        setpassword('');


    };

    const handleRegister = (event) =>{
        event.preventDefault();

        navigate('/register');


    } 

    return(
        <div>
            <header className="border-b text-center font-bold text-xl p-3">
            Skill Assessment

        </header>
        
            <form>
            <div className="mb-6 flex flex-col justify-center items-center space-y-4">
                <input type="username" id="username" className="bg-gray-50 items-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Username" onChange={(event) =>
                    setuserName(event.target.value)
                    }required></input>
       
                <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Password" onChange={(event) => {
                    setpassword(event.target.value);
                    }}required></input>
            </div> 
            <div className='mb-6 flex flex-col justify-center items-center space-y-4'>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/4  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={ handleSubmit
                }>Sign In</button>

                <button type="click" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/4  px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={ handleRegister
                }>Register</button>
            </div>
            

            </form>
            


            <Footer/>
        </div>
    )
}

export default SignIn;
