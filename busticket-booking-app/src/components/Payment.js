import React,{useState} from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const Payment = () => {

    const location = useLocation();
    const{price, numOftickets} = location.state;

    const[payment, setPayment] = useState({
            cardNumber:"",
            nameOnCard:"",
            expireDate:"",
            totalPrice: numOftickets * price
    });

    const handleInputChange = (e) => {
        setPayment((prevState) => {
            return {...prevState,[e.target.name]:[e.target.value]}
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Payment Page</h2>

                  <form onSubmit={(e)=>onSubmit(e)}>
                    {/* <div className="mb-3">
                        <label htmlFor="cardNumber" className="form-label">Payment method</label>
                        <select>
                            <option value="upi">Upi</option>
                            <option value="card">Credit/Debit Card</option>
                        </select>
                    </div> */}
                    <div className="mb-3">
                        <label htmlFor="cardNumber" className="form-label">Card Number</label>
                        <input type="email" value={payment.cardNumber} onChange={(e)=>handleInputChange(e)} className="form-control" name="cardNumber"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nameOnCard" className="form-label">Name on Card</label>
                        <input type="text" value={payment.nameOnCard} onChange={(e)=>handleInputChange(e)} className="form-control" name="nameOnCard"/>
                    </div>
                     <div className="mb-3">
                        <label htmlFor="expireDate" className="form-label">Expire Date</label>
                        <input type="text" value={payment.expireDate} onChange={(e)=>handleInputChange(e)} className="form-control" name="expireDate"/>
                    </div>
                     <div className="mb-3">
                        <label htmlFor="totalPrice" className="form-label">Total Price</label>
                        <input type="number" value={payment.totalPrice} className="form-control" name="totalPrice"/>
                    </div>
                    {/* {error & <p className="alert alert-danger">{error}</p> } */}

                    <button type="submit" className="btn btn-outline-primary ">Pay</button>
                    <Link to="/" className="btn btn-outline-danger mx-2">Cancel</Link>
                  </form>

                </div>
            </div>
        </div>
    )
}

export default Payment;