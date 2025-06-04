import React, { useState, useEffect } from "react";
import { REST_API_BASE_URL } from "../utils/AxiosInteraction";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const BusList = () => {

    // const {id} = useParams(); //userId from Dashboard - login user details
    const {state} = useLocation();  //returns a obj { state:{} }

     const[busList, setBusList] = useState([]);
     const[tempbusList, setTempBusList] = useState([]); //copy of busList 
     const[location, setLocation] = useState({
        fromLoc:"",
        toLoc:""
     });

    useEffect(()=>{
        getBusList(); //Whenever BusList renders, load/show the bus list from DB
    },[])

    //load the employee list 
    const getBusList = async () => {
       const response = await axios.get(REST_API_BASE_URL + "/buslist");
       console.log("Bus list page ",response);
       setBusList(response.data);
       setTempBusList(response.data);
    }

    const onSearch = () => {
        let filteredBus = tempbusList.map((obj) => {
            if(obj.fromLoc === location.fromLoc && obj.toLoc === location.toLoc){
                return obj
                // setTempBusList((prevState) => {
                //     return {...prevState,obj}
                // })
            }
        })
        setTempBusList(filteredBus);
        console.log("tempbusList ",tempbusList);
    }

    const reset = () => {
        // getBusList();  
        setTempBusList(busList);
    }

    const handleInputChange = (e) => {
        setLocation((prevState) => {
            return {...prevState,[e.target.name]:e.target.value}
        })
    }

    const deleteBus= async(id)=>{
        await axios.delete(REST_API_BASE_URL +`/bus/${id}`);
        getBusList(); //after deleted, load all the bus details 
    }

    return(
        <div className="container">
            <div className="mb-3">
                <label htmlFor="fromLoc" className="form-label">From</label>
                <input type="text" value={location.fromLoc} onChange={(e)=>handleInputChange(e)} name="fromLoc" placeholder="From location"/>
            </div>
            <div className="mb-3">
                <label htmlFor="toLoc" className="form-label">To</label>
                <input type="text" value={location.toLoc} onChange={(e)=>handleInputChange(e)} name="toLoc" placeholder="To location"/>
            </div>
            <button type="submit" onChange={(e) => onSearch(e)} className="btn btn-outline-primary">Search</button>
            <button>Reset</button>
            <div className="py-4 my-2">
                <table className="table border shadow">
                <thead>
                    <tr>
                    <th scope="row">Sno</th>
                    <th scope="col">Bus Name</th>
                    <th scope="col">Bus Number</th>
                    <th scope="col">Boarding Point</th>
                    <th scope="col">Dropping point</th>
                    <th scope="col">Price</th>
                    <th scope="col">Available seats</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tempbusList.map((obj,index)=>{
                            return(
                                <tr key={obj.id}>
                                    <td>{index+1}</td>
                                    <td>{obj.busName}</td>
                                    <td>{obj.busNumber}</td>
                                    <td>{obj.fromLoc}</td>
                                    <td>{obj.toLoc}</td>
                                    <td>{obj.ticketPrice}</td>
                                    <td>{obj.noOfSeats}</td>

                                    <td>
                                        {
                                            state && state.role == "admin" && (
                                            <>
                                                <Link to={`/editbus/${obj.id}/${state.userId}`} className="btn btn-outline-primary mx-2">Edit</Link>
                                                <button className="btn btn-danger mx-2" onClick={()=>deleteBus(obj.id)}>Delete</button>
                                            </> )
                                        }
                                        <Link to={`/bookticket/${obj.id}/${state.userId}`} className="btn btn-outline-primary mx-2">Book</Link>
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

export default BusList;