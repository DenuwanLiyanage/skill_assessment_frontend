import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from 'react';
import axios from "axios";

function CreateOrder() {
    
    const navigate = useNavigate();
    const [itemName, setitemName] = useState('');
    const [quantity, setquantity] = useState(0);
    const [no, setno] = useState('');
    const [street, setstreet] = useState('');
    const [city, setcity] = useState('');
    const [postalCode, setpostalCode] = useState('');
    const [totalCost, settotalCost] = useState(0.00);
    const [latestOrder, setlatestOrder] = useState('');

    const [isCanceled, setisCanceled] = useState(false);
    const orderUrl = 'http://localhost:8087/orders/new-order'
    const cancelUrl = 'http://localhost:8087/orders/change-status'

    useEffect(()=>{
        try {
            var token = localStorage.getItem("token");
        } catch (error) {
            navigate('/')
            return
        }
        if (token === null){
            navigate('/')
        }
   });

    const handlePlaceOrder = (event) =>{

        event.preventDefault();
        var token = null;
        try {
            token = localStorage.getItem("token");
        } catch (error) {
            navigate('/')
            return
        }
        if (token === null){
            navigate('/')
        }


        if( itemName === '' || quantity === '' || no === '' || street === '' || city === ''
            ||postalCode === ''|| totalCost ===''){
                console.log("Provide all details");
                navigate('/create-order');
            }else{
                axios.post(orderUrl, {
                    itemName: itemName,
                    quantity: parseInt(quantity,10),
                    totalCost: parseFloat(totalCost),
                    shippingAddress: {
                        no: no,
                        street: street,
                        city: city,
                        postalCode: postalCode
                    },
                    orderStatus: "NEW"
                    },{
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+token
                        }
                    })
                    .then(function (response) {
                        setlatestOrder(response.data.id);
                        // localStorage.setItem ("latestOrder",response.data.id);
                        console.log(response);

                        if(response.status ===200){
                            console.log("Order created successfully")
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
    
                navigate('/create-order');
                setcity("");
                setitemName("");
                setno("")
                setpostalCode("")
                setquantity('')
                setstreet("")
                settotalCost('')
                setisCanceled(false);
            }
        
        
    }

    const handleCancelOrder = (event) =>{
        event.preventDefault();
        // var latestOrder = localStorage.getItem("latestOrder");
        var token = null;
        try {
            token = localStorage.getItem("token");
        } catch (error) {
            navigate('/')
            return
        }
        if (token === null){
            navigate('/')
        }


        if (latestOrder === null){
            console.log("No latest order to cancel");
            navigate('/create-order');
        }
        
        axios.patch(cancelUrl, {
            id: latestOrder,
            orderStatus: "CANCELLED"
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token
                }
            })
            .then(function (response) {
                console.log(response);

                if(response.status ===200){
                    setisCanceled(true);
                    console.log("Order Cancelled")
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        navigate('/create-order');
        
    }

    const handleHome = (event) =>{
        event.preventDefault();
       

        navigate('/home');
        
    }

    let popup;

    if(isCanceled){

        popup = <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Error icon</span>
        </div>
        <div className="ml-3 text-sm font-normal">Item has been deleted.</div>
        <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
            <span className="sr-only">Close</span>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
    </div>
        
{/* <div id="toast-interactive" className="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert">
    <div className="flex">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Refresh icon</span>
        </div>
        <div className="ml-3 text-sm font-normal">
            <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Order Delete</span>
            <div className="mb-2 text-sm font-normal">A new software version is available for download.</div> 
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <a href="#" className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">OK</a> 
                </div>
            </div>    
        </div>
        <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-interactive" aria-label="Close">
            <span className="sr-only">Close</span>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
    </div>
</div> */}



    }

    return(
        <div className="h-full">
            
            
            <Header/>

            <h1 className="border-b text-center font-bold text-xl">
                Place an Order
            </h1>
            {/* {popup} */}
            <form>
            <div className="mb-6 flex flex-col justify-center items-center space-y-3">
                <input type="itemName" id="itemName" className="bg-gray-50 items-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Item Name" onChange={(event) =>
                    setitemName(event.target.value)
                    }></input>
       
                <input type="quantity" id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Quantity" onChange={(event) => {
                    setquantity(event.target.value);
                    }}></input>
        
                <input type="totalCost" id="totalCost" className="bg-gray-50 items-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Total Cost" onChange={(event) =>
                    settotalCost(event.target.value)
                    }></input>


                <h1 className="mb-6 flex flex-col font-bold justify-center items-center space-y-4">Address</h1>

                <input type="no" id="no" className="bg-gray-50 items-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter No." onChange={(event) =>
                        setno(event.target.value)
                        }></input>
                    
                <input type="street" id="street" className="bg-gray-50 items-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Street" onChange={(event) =>
                    setstreet(event.target.value)
                    }></input>

                
                <input type="city" id="city" className="bg-gray-50 items-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter City" onChange={(event) =>
                    setcity(event.target.value)
                    }></input>

                <input type="postalCode" id="postalCode" className="bg-gray-50 items-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Postal Code" onChange={(event) =>
                    setpostalCode(event.target.value)
                    }></input>
            
            </div>
            <div className='mb-6 flex flex-col justify-center items-center space-y-3'>
                <button type="click" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/4  px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={ handlePlaceOrder }>Place Order</button>

            </div>
            

        </form>
            <div className='mb-6 flex flex-col justify-center items-center space-y-4'>
                
                <button type="click" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/4  px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={ handleCancelOrder }>Cancel the Order</button>

                <button type="click" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/4  px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={ handleHome }>Home</button>


            </div>
            
            
            <Footer/>
        </div>
    )
}

export default CreateOrder;