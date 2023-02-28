import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import axios from 'axios'
import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';


const url = 'http://localhost:8087/orders/all-orders'

function Home() {

    const [isOrderDataReceived, setisOrderDataReceived] = useState(false);
    const [tableData, settableData] = useState([]);

    const navigate = useNavigate();

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

    const handleShowOrders = (event) =>{
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
        axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token
                }
            })
            .then(function (response) {
                if(response.status===200){
                    setisOrderDataReceived(true);
                    response.data.map(res => tableData.push(res));
                    
                }
                
                
            })
            .catch(function (error) {
                navigate('/')
                console.log(error);
            });

        
    }

    const handleCreateOrder = (event) =>{
        event.preventDefault();
        navigate('/create-order');
        
    }
    let table

    if(isOrderDataReceived){


        var newTable = tableData.length>10 ? tableData.slice(-10):tableData
        console.log(newTable)
        table = <div>
        <h2>Orders List</h2>
        <table className="table-auto" >
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Total Cost</th>
                    <th>Order Status</th>
                </tr>
            </thead>
            <tbody>
                {newTable.map((order,i) => 
                   (<tr key={i}>
                    <td>{order.itemName}</td>
                    <td>{order.quantity}</td>
                    <td>{order.totalCost}</td>
                    <td>{order.orderStatus}</td>
                </tr>
                    
                ))}
            </tbody>
        </table>
    </div>
    }

    return(
        <div className="h-full">
            <Header/>
            <h1 className="border-b text-center font-bold text-xl">
                Home
            </h1>

            <div className='mb-6 flex flex-col justify-center items-center space-y-4'>
                <button type="click" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/4  px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={ handleShowOrders }>Show orders</button>

                {table}

                <button type="click" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-2/4  px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={ handleCreateOrder }>Create an Order</button>


            </div>
            
            <Footer/>
        </div>
        

    )
}

export default Home;