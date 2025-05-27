import React from "react";
import { REST_API_BASE_URL } from "../utils/AxiosInteraction";

const BookingHistory = () => {

    const[bookingHistory, setBookingHistory] = useState([]);

    useEffect(()=>{
        getBookingHistory(); //Whenever home page renders, load/show the bus list from DB
    },[])

    //load the employee list 
    const getBookingHistory = async () => {
       const response = await axios.get(REST_API_BASE_URL + "/buslist");
       console.log("Bus list page ",response);
       setBookingHistory(response.data);
    }

    const cancelBooking = async(id)=>{
        await axios.delete(REST_API_BASE_URL +`/bus/${id}`);
        getBusList(); //after deleted, load all the bus details 
    }

    return(
        <div className="container">
            <input type="text" placeholder="From location"/>
            <input type="text" placeholder="To location"/>
            <button>Search</button>
            <button>Reset</button>
            <div className="py-4 my-2">
                <table className="table border shadow">
                <thead>
                    <tr>
                    <th scope="col">Bus Number</th>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        busList.map((obj,index)=>{
                            return(
                                <tr>
                                <th scope="row" key={index}>{index+1}</th>
                                <td>{obj.busNumber}</td>
                                <td>{obj.from}</td>
                                <td>{obj.to}</td>
                                <td>{obj.name}</td>
                                <td>{obj.email}</td>
                                <td>{obj.contact}</td>
                                <td>{obj.totalPrice}</td>
                                <td>
                                    <button className="btn btn-danger mx-2" onClick={()=>deleteBus(obj.id)}>Cancel</button>
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