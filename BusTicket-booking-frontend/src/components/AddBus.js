import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { REST_API_BASE_URL } from "../utils/AxiosInteraction";
import axios from "axios";

const AddBus = () => {

    let navigate = useNavigate();

    const[addBus, setAddBus] = React.useState({
        busName:"",
        busNumber:"",
        fromLoc:"",
        toLoc:"",
        ticketPrice:"",
        noOfSeats:""
    });
    const[error, setError] = React.useState("");

    const handleInputChange = (e) => {
        setAddBus((prevState)=>{
            return {...prevState, [e.target.name]:e.target.value}
        })
    }

    const onSubmit= async(e)=>{
        e.preventDefault(); 
         try{
            if(!addBus.busName || !addBus.busNumber || !addBus.fromLoc || !addBus.toLoc || !addBus.ticketPrice || !addBus.noOfSeats){
                setError("Please fill in all the details");
                return;
            }
            const response = await axios.post(REST_API_BASE_URL + "/addbus",addBus);
            console.log("Add bus ",response.data);
            if(response.data != null){
                alert("Bus added successfully");
                // navigate("/buslist");   //navigate to bus list
            }
        }
        catch(error){
            console.error("Add bus entry failed ",error);
            setError(error.response ? error.response.data.error : error.message);
        }
    }

    return(
       <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Add Bus</h2>
                    {error && <p className="alert alert-danger">{error}</p>}

                  <form onSubmit={(e)=>onSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="busName" className="form-label">Bus Name</label>
                        <input type="text" value={addBus.busName} onChange={(e)=>handleInputChange(e)} className="form-control" name="busName" placeholder="enter your name"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="busNum" className="form-label">Bus Number</label>
                        <input type="text" value={addBus.busNumber} onChange={(e)=>handleInputChange(e)} className="form-control" name="busNumber" placeholder="enter the email"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fromLoc" className="form-label">Boarding Point</label>
                        <input type="text" value={addBus.fromLoc} onChange={(e)=>handleInputChange(e)} className="form-control" name="fromLoc" placeholder="enter the password"/>
                    </div>
                     <div className="mb-3">
                        <label htmlFor="toLoc" className="form-label">Dropping Point</label>
                        <input type="text" value={addBus.toLoc} onChange={(e)=>handleInputChange(e)} className="form-control" name="toLoc" placeholder="enter the mobile number"/>
                    </div>
                     <div className="mb-3">
                        <label htmlFor="ticketPrice" className="form-label">Ticket Price</label>
                        <input type="number" value={addBus.ticketPrice} onChange={(e)=>handleInputChange(e)} className="form-control" name="ticketPrice"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="noOfSeats" className="form-label">No of seats</label>
                        <input type="number" value={addBus.noOfSeats} onChange={(e)=>handleInputChange(e)} className="form-control" name="noOfSeats"/>
                    </div>
                    <button type="submit" className="btn btn-outline-primary ">Add</button>
                    <Link to="/" className="btn btn-outline-danger mx-2">Cancel</Link>
                  </form>

                </div>
            </div>
        </div>
    )
}

export default AddBus;