import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { REST_API_BASE_URL } from "../utils/AxiosInteraction";

const BookingHistory = () => {
    
    console.log("url param ",useParams());
    const {userId} = useParams(); //userId from Dashboard - login user details

    const[bookingHistory, setBookingHistory] = useState([]);

    useEffect(()=>{
        getBookingHistory(); //Whenever home page renders, load/show the bus list from DB
    },[])

    //load the employee list 
    const getBookingHistory = async () => {
       const APIURL = userId != null ? `/bookinghistory/user/${userId}` : "/bookinghistory"
       const response = await axios.get(REST_API_BASE_URL + APIURL);
       console.log("Bus list page ",response);
       setBookingHistory(response.data);
    }

    const cancelBooking = async(id)=>{
        const response = await axios.delete(REST_API_BASE_URL + `/cancelbooking/${userId}`);
        console.log(response.data);
        getBookingHistory();
    }

    return(
        <div className="container">
            <h2>Booking History</h2>
            <div className="py-4 my-2">
                <table className="table border shadow">
                <thead>
                    <tr>
                    <th scope="row">Sno</th>
                    <th scope="col">Bus Number</th>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Seats Booked</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookingHistory.map((obj,index)=>{
                            return(
                                 <tr key={obj.id}>
                                    <td>{index+1}</td>
                                    <td>{obj.busNumber}</td>
                                    <td>{obj.fromLoc}</td>
                                    <td>{obj.toLoc}</td>
                                    <td>{obj.name}</td>
                                    <td>{obj.email}</td>
                                    <td>{obj.contact}</td>
                                    <td>{obj.noOfTickets}</td>
                                    <td>{obj.totalPrice}</td>
                                    <td>
                                        <button className="btn btn-danger mx-2" onClick={()=>cancelBooking(obj.id)}>Cancel</button>
                                    </td>
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

export default BookingHistory;