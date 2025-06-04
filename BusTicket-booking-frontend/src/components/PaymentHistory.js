import React, { useState, useEffect } from "react";
import { REST_API_BASE_URL } from "../utils/AxiosInteraction";
import { useParams } from "react-router-dom";
import axios from "axios";

const PaymentHistory = () => {

    console.log("url param ",useParams());
    const {userId} = useParams(); //userId from Dashboard - login user details

    const[paymentLists, setPaymentLists] = useState([]);

    useEffect(()=>{
        getPaymentHistory(); //Whenever home page renders, load/show the payment list
    },[])

    //load the payment list 
    const getPaymentHistory = async () => {
        if(userId != null){
            const response = await axios.get(REST_API_BASE_URL + `/payment/user/${userId}`);
            console.log("Payment list with userId ",response.data);
            setPaymentLists(response.data);
        }
        else{
            const response = await axios.get(REST_API_BASE_URL + "/paymentslist");
            console.log("payment list ",response.data);
            setPaymentLists(response.data);
        }
       
    }

    return(
        <div className="container">
            <h2>Transaction History</h2>
            <div className="py-4 my-2">
                <table className="table border shadow">
                <thead>
                    <tr>
                    <th scope="row">Sno</th>
                    {/* <th scope="col">Card Number</th> */}
                    <th scope="col">Name on Card</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Payment Status</th>
                    <th scope="col">Bus Number</th>
                    <th scope="col">Payment Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        paymentLists.map((obj,index)=>{
                            return(
                                <tr key={obj.id}>
                                    <td>{index+1}</td>
                                    {/* <td>{obj.cardNumber}</td> */}
                                    <td>{obj.user.name}</td>
                                    <td>{obj.amount}</td>
                                    <td>{obj.paymentStatus}</td>
                                    <td>{obj.booking.bus.busNumber}</td>
                                    <td>{obj.paymentDate.split("T")[0] + " "+ obj.paymentDate.split("T")[1]}</td>
                                </tr>
                            )
                        })
                    }
                  
                </tbody>
                </table>
            </div>
    </div>
    )
}

export default PaymentHistory;