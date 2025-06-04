import React,{useState} from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import {REST_API_BASE_URL} from "../utils/AxiosInteraction";

const Payment = () => {

    const location = useLocation();
    const{userId, bookingId, price, noOfTickets} = location.state;

    const[payment, setPayment] = useState({
        cardNumber: "",
        nameOnCard: "",
        amount: noOfTickets * price
    });

    const handleInputChange = (e) => {
        setPayment((prevState) => {
            return {...prevState,[e.target.name]:e.target.value}
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("onsubmit payment st ",payment);
        try {
            //booking api call
            // const response1 = await axios.post(REST_API_BASE_URL + "/bookbus", location.state);


            const response = await axios.post(REST_API_BASE_URL + `/payment/${userId}/${bookingId}`,
                {...payment, paymentDate: new Date().toISOString() }
            );
            alert('Payment successful!');
            console.log(response.data);
        } catch (error) {
            alert('Payment failed!');
            console.error(error);
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Payment Page</h2>

                  <form onSubmit={(e)=>onSubmit(e)}>
                    {/* <div className="mb-3">
                        <label htmlFor="cardNumber" className="form-label block text-sm font-medium">Payment Method</label>
                        <select
                            name="paymentMethod"
                            value={payment.paymentMethod}
                            onChange={(e)=>handleInputChange(e)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="UPI">UPI</option>
                            <option value="Card">Credit/Debit Card</option>
                        </select>
                    </div> */}
                    {/* {
                        payment.paymentMethod == "Card" ? (
                            <> */}
                             <div className="mb-3">
                                <label htmlFor="cardNumber" className="form-label">Card Number</label>
                                <input type="text" value={payment.cardNumber} onChange={(e)=>handleInputChange(e)} className="form-control" name="cardNumber"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nameOnCard" className="form-label">Name on Card</label>
                                <input type="text" value={payment.nameOnCard} onChange={(e)=>handleInputChange(e)} className="form-control" name="nameOnCard"/>
                            </div>
                            {/* <div className="mb-3">
                                <label htmlFor="expireDate" className="form-label">Expire Date</label>
                                <input type="text" value={payment.expireDate} onChange={(e)=>handleInputChange(e)} className="form-control" name="expireDate"/>
                            </div> */}
                            {/* </>
                        ) : (
                           <div className="mb-3">
                                <label htmlFor="UPI_Id" className="form-label">UPI Id</label>
                                <input type="text" value={payment.UPI_Id} onChange={(e)=>handleInputChange(e)} className="form-control" name="UPI_Id"/>
                            </div> )
                    } */}
                   
                     <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Total Amount</label>
                        <input type="number" value={payment.amount} className="form-control" name="amount"/>
                    </div>
                    {/* {error & <p className="alert alert-danger">{error}</p> } */}

                    <button type="submit" className="btn btn-outline-primary ">Pay Now</button>
                    <Link to="/bookticket/:id" className="btn btn-outline-danger mx-2">Cancel</Link>
                  </form>

                </div>
            </div>
        </div>
    )
}

export default Payment;