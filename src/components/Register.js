import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const url = 'http://localhost:8086/clients/sign-up'

function Register() {

    const navigate = useNavigate();
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [no, setno] = useState('');
    const [street, setstreet] = useState('');
    const [city, setcity] = useState('');
    const [postalCode, setpostalCode] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');

    const handleRegister = (event) =>{
        event.preventDefault();

        
        if (password === confirmPassword){
            if( firstName === '' || lastName === '' || no === '' || street === '' || city === ''
            ||postalCode === ''|| username ==='' || password ===''){
                console.log("Provide all details");
                navigate('/register');
            }else{
                axios.post(url, {
                    firstName: firstName,
                    lastName: lastName,
                    clientAddress: {
                        no: no,
                        street: street,
                        city: city,
                        postalCode: postalCode
                    },
                    username: username,
                    password: password
                    },{
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    .then(function (response) {
                    console.log(response);
                    })
                    .catch(function (error) {
                    console.log(error);
                    });
    
                navigate('/');
            }
            
        }else{
            setpassword('');
            setconfirmPassword('');
        }
    } 

    const handleSignIn = (event) =>{
        event.preventDefault();

        navigate('/');

    } 

    return(
        <div className="h-full justify-center items-center space-y-4">
        <header className="border-b text-center font-bold text-xl p-3">
            Skill Assessment

        </header>
        <h1 className=" border-b text-center font-bold text-xl">
            Register Client
        </h1>
        
        <form>
            <div className="mb-6 flex flex-col justify-center items-center space-y-3">
                <input type="firstName" id="firstName" className="bg-gray-50 items-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter First Name" onChange={(event) =>
                    setfirstName(event.target.value)
                    }required></input>
       
                <input type="lastName" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Last Name" onChange={(event) => {
                    setlastName(event.target.value);
                    }}required></input>
        
                <input type="username" id="username" className="bg-gray-50 items-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Username" onChange={(event) =>
                    setusername(event.target.value)
                    }required></input>
                
                <input type="password" id="password" className="bg-gray-50 items-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Password" required onChange={(event) =>
                    setpassword(event.target.value)
                    }></input>

                <input type="password" id="confirmPassword" className="bg-gray-50 items-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm Password" required onChange={(event) =>
                    setconfirmPassword(event.target.value)
                    }></input>


                <h1 className="mb-6 flex flex-col font-bold justify-center items-center space-y-4">Address</h1>

                <input type="no" id="no" className="bg-gray-50 items-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter No." onChange={(event) =>
                        setno(event.target.value)
                        }required></input>
                    
                <input type="street" id="street" className="bg-gray-50 items-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Street" onChange={(event) =>
                    setstreet(event.target.value)
                    }required></input>

                
                <input type="city" id="city" className="bg-gray-50 items-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter City" onChange={(event) =>
                    setcity(event.target.value)
                    }required></input>

                <input type="postalCode" id="postalCode" className="bg-gray-50 items-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Postal Code" onChange={(event) =>
                    setpostalCode(event.target.value)
                    }required></input>
            
            </div>
            <div className='mb-6 flex flex-col justify-center items-center space-y-4'>
                <button type="click" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/4  px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={ handleRegister
                }>Submit</button>

            <button type="click" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/4  px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={ handleSignIn
                }>Sign In</button>
            </div>
            

        </form>

        <Footer/>
        </div>
        
    )
}

export default Register;