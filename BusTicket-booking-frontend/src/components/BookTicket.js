import React,{useState, useEffect} from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { REST_API_BASE_URL } from "../utils/AxiosInteraction";

const BookTicket = () => {

     let navigate = useNavigate();
     const{busId, userId} = useParams();

     const[bookTicket, setBookTicket] = useState({
        busNumber:"",
        fromLoc:"",
        toLoc:"",
        userName:"",
        email:"",
        contact:"",
        noOfTickets:""
    });
    const[error, setError] = useState("");

    useEffect(()=>{
        loadBusInfo();
    },[])

    const handleInputChange = (e) => {
        setBookTicket((prevState) => {
            return {...prevState, [e.target.name]:e.target.value}
        })
    }

    const loadBusInfo = async() => {
        const response = await axios.get(REST_API_BASE_URL + `/bus/${busId}`);
        console.log("display bus info ",response.data);
        setBookTicket(response.data);
    }

     const onSubmit= async(e)=>{
        e.preventDefault();     //to prevent the page from loading on click of submit
        console.log("bookticket state ",bookTicket);
        try{
            if(!bookTicket.busNumber || !bookTicket.fromLoc || !bookTicket.toLoc || !bookTicket.userName || !bookTicket.email || !bookTicket.contact || !bookTicket.noOfTickets){
                setError("Please fill in all the details");
                return;
            }
            const response = await axios.post(REST_API_BASE_URL + `/bookbus/${busId}/${userId}`, {
                        busNumber: bookTicket.busNumber,
                        fromLoc: bookTicket.fromLoc,
                        toLoc: bookTicket.toLoc,
                        userName: bookTicket.userName,
                        email: bookTicket.email,
                        contact: bookTicket.contact,
                        noOfTickets: bookTicket.noOfTickets,
                        ticketPrice: bookTicket.ticketPrice,
            });
            console.log("Book bus ",response.data);
            if(response.data != null){
                navigate("/payment",{state: {userId: userId, bookingId: response.data.id, price: bookTicket.ticketPrice, noOfTickets: bookTicket.noOfTickets}}); //navigate to Payment page
            }
        }
        catch(error){
            console.error("Book bus entry failed ",error);
            setError(error.response ? error.response.data.error : error.message);
        }
        
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Ticket Booking</h2>
                    {error && <p className="alert alert-danger">{error}</p>}
                  <form onSubmit={(e)=>onSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="busNumber" className="form-label">Bus Number</label>
                        <input type="number" value={bookTicket.busNumber} onChange={(e)=>handleInputChange(e)} className="form-control" name="busNumber" placeholder="enter your name"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fromLoc" className="form-label">From Location</label>
                        <input type="text" value={bookTicket.fromLoc} onChange={(e)=>handleInputChange(e)} className="form-control" name="fromLoc" placeholder="enter the email"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="toLoc" className="form-label">To Location</label>
                        <input type="text" value={bookTicket.toLoc} onChange={(e)=>handleInputChange(e)} className="form-control" name="toLoc" placeholder="enter the password"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label">Name</label>
                        <input type="text" value={bookTicket.userName} onChange={(e)=>handleInputChange(e)} className="form-control" name="userName" placeholder="enter the password"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" value={bookTicket.email} onChange={(e)=>handleInputChange(e)} className="form-control" name="email" placeholder="enter the password"/>
                    </div>
                     <div className="mb-3">
                        <label htmlFor="contact" className="form-label">Contact</label>
                        <input type="number" value={bookTicket.contact} onChange={(e)=>handleInputChange(e)} className="form-control" name="contact" placeholder="enter the mobile number"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="noOfTickets" className="form-label">No of Tickets</label>
                        <input type="number" value={bookTicket.noOfTickets} onChange={(e)=>handleInputChange(e)} className="form-control" name="noOfTickets" placeholder="enter the password"/>
                    </div>
                    <button type="submit" className="btn btn-outline-primary ">Pay & Book</button>
                    <Link to="/" className="btn btn-outline-danger mx-2">Cancel</Link>
                  </form>

                </div>
            </div>
        </div>
    )
}

export default BookTicket;