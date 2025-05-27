import React, { useEffect, useState } from "react";
import { REST_API_BASE_URL } from "../utils/AxiosInteraction";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";

const EditBus = () => {

    let navigate = useNavigate();

    const {id} = useParams(); //returns an obj, destructuring it 

    const[editUser, setEditUser] = useState({
        busName:"",
        busNumber:"",
        from:"",
        to:"",
        price:"",
        seats:""
    });

    useEffect(()=>{
        loadBusInfo(); //To display the particular bus details on click of edit button
    },[])

     const handleInputChange = (e) => {
        setEditUser((prevState)=>{
            return {...prevState, [e.target.name]:e.target.value}
        })
    }

    const onSubmit= async(e)=>{
        e.preventDefault();     //to prevent the page from loading on click of submit
        await axios.put(REST_API_BASE_URL + `/user/${id}`,editUser);
        navigate("/userlist");
    }

    const loadBusInfo = async() => {
        const response = await axios.get(REST_API_BASE_URL + `/user/${id}`);
        console.log("edit user ",response.data);
        setEditUser(response.data);
    }

    return(
       <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit Bus</h2>

                  <form onSubmit={(e)=>onSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="busName" className="form-label">Bus Name</label>
                        <input type="text" value={editUser.busName} onChange={(e)=>handleInputChange(e)} className="form-control" name="busName" placeholder="enter your name"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="busNum" className="form-label">Bus Number</label>
                        <input type="text" value={editUser.busNumber} onChange={(e)=>handleInputChange(e)} className="form-control" name="busNumber" placeholder="enter the email"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="from" className="form-label">Boarding Point</label>
                        <input type="text" value={editUser.from} onChange={(e)=>handleInputChange(e)} className="form-control" name="from" placeholder="enter the password"/>
                    </div>
                     <div className="mb-3">
                        <label htmlFor="to" className="form-label">Dropping Point</label>
                        <input type="text" value={editUser.to} onChange={(e)=>handleInputChange(e)} className="form-control" name="to" placeholder="enter the mobile number"/>
                    </div>
                     <div className="mb-3">
                        <label htmlFor="price" className="form-label">Ticket Price</label>
                        <input type="number" value={editUser.price} onChange={(e)=>handleInputChange(e)} className="form-control" name="price"/>User
                    </div>
                    <div className="mb-3">
                        <label htmlFor="seats" className="form-label">No of seats</label>
                        <input type="number" value={editUser.seats} onChange={(e)=>handleInputChange(e)} className="form-control" name="seats"/>User
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