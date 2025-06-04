import React, { useEffect, useState } from "react";
import { REST_API_BASE_URL } from "../utils/AxiosInteraction";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";

const EditBus = () => {

    let navigate = useNavigate();

    console.log(useParams());
    const {busId, userId} = useParams(); //returns an obj, destructuring it 

    const[editBus, setEditBus] = useState({
        busName:"",
        busNumber:"",
        fromLoc:"",
        toLoc:"",
        ticketPrice:"",
        noOfSeats:""
    });

    useEffect(()=>{
        loadBusInfo(); //To display the particular bus details on click of edit button
    },[])

     const handleInputChange = (e) => {
        setEditBus((prevState)=>{
            return {...prevState, [e.target.name]:e.target.value}
        })
    }

    const onSubmit= async(e)=>{
        e.preventDefault();     //to prevent the page from loading on click of submit
        const response = await axios.put(REST_API_BASE_URL + `/editbus/${busId}`,editBus);
        console.log("edit user ",response.data);
        if(response.data != null){
            navigate("/buslist", { state:{userId: userId} });
        }
    }

    const loadBusInfo = async() => {
        const response = await axios.get(REST_API_BASE_URL + `/bus/${busId}`);
        console.log("display bus ",response.data);
        setEditBus(response.data);
    }

    return(
       <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit Bus</h2>

                  <form onSubmit={(e)=>onSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="busName" className="form-label">Bus Name</label>
                        <input type="text" value={editBus.busName} onChange={(e)=>handleInputChange(e)} className="form-control" name="busName" placeholder="enter your name"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="busNum" className="form-label">Bus Number</label>
                        <input type="text" value={editBus.busNumber} onChange={(e)=>handleInputChange(e)} className="form-control" name="busNumber" placeholder="enter the email"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fromLoc" className="form-label">Boarding Point</label>
                        <input type="text" value={editBus.fromLoc} onChange={(e)=>handleInputChange(e)} className="form-control" name="fromLoc" placeholder="enter the password"/>
                    </div>
                     <div className="mb-3">
                        <label htmlFor="toLoc" className="form-label">Dropping Point</label>
                        <input type="text" value={editBus.toLoc} onChange={(e)=>handleInputChange(e)} className="form-control" name="toLoc" placeholder="enter the mobile number"/>
                    </div>
                     <div className="mb-3">
                        <label htmlFor="price" className="form-label">Ticket Price</label>
                        <input type="number" value={editBus.ticketPrice} onChange={(e)=>handleInputChange(e)} className="form-control" name="ticketPrice"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="noOfSeats" className="form-label">No of seats</label>
                        <input type="number" value={editBus.noOfSeats} onChange={(e)=>handleInputChange(e)} className="form-control" name="noOfSeats"/>
                    </div>
                    <button type="submit" className="btn btn-outline-primary ">Update</button>
                    <Link to="/" className="btn btn-outline-danger mx-2">Cancel</Link>
                  </form>

                </div>
            </div>
        </div>
    )
}

export default EditBus;