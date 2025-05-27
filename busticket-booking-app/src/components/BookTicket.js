import React,{useState} from "react";
import { useNavigate, Link } from "react-router-dom";

const BookTicket = () => {

     let navigate = useNavigate();

     const[bookTicket, setBookTicket] = useState({
        busNumber:"",
        fromLoc:"",
        toLoc:"",
        userName:"",
        email:"",
        contact:"",
        price:"",
        noOfTickets:""
    });
    const[error, setError] = useState("");

    const handleInputChange = (e) => {
        setBookTicket((prevState) => {
            return {...prevState, [e.target.name]:e.target.value}
        })
    }

     const onSubmit= async(e)=>{

        e.preventDefault();     //to prevent the page from loading on click of submit
        if(!bookTicket.busNumber || !bookTicket.from || !bookTicket.to || !bookTicket.name || !bookTicket.email || !bookTicket.contact || !bookTicket.price || !bookTicket.numOftickets){
            setError("Please fill in all the details");
            return;
        }
        navigate("/payment",{state: bookTicket});
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
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" value={bookTicket.userName} onChange={(e)=>handleInputChange(e)} className="form-control" name="name" placeholder="enter the password"/>
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
                    <button type="submit" className="btn btn-outline-primary ">Book</button>
                    <Link to="/" className="btn btn-outline-danger mx-2">Cancel</Link>
                  </form>

                </div>
            </div>
        </div>
    )
}

export default BookTicket;