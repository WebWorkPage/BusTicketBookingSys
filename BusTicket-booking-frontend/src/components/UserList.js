import React, { useState, useEffect } from "react";
import { REST_API_BASE_URL } from "../utils/AxiosInteraction";
import { Link } from "react-router-dom";
import axios from "axios";

const UserList = () => {

    const[userList, setUserList] = useState([]);

    useEffect(()=>{
        getUserList(); //Whenever BusList renders, load/show the bus list from DB
    },[])

    //load the employee list 
    const getUserList = async () => {
       const response = await axios.get(REST_API_BASE_URL + "/userlist");
       console.log("user list page ",response);
       setUserList(response.data);
    }

    const deleteUser= async(id)=>{
        await axios.delete(REST_API_BASE_URL +`/deleteuser/${id}`);
        getUserList(); //after deleted, load all the bus details 
    }

    return(
        <div className="container">
            <h2>User Lists</h2>
            <div className="py-4 my-2">
                <table className="table border shadow">
                <thead>
                    <tr>
                    <th scope="row">Sno</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone No</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userList.map((obj,index)=>{
                            return(
                                <tr key={obj.id}>
                                    <td>{index+1}</td>
                                    <td>{obj.name}</td>
                                    <td>{obj.email}</td>
                                    <td>{obj.phoneNo}</td>
                                    <td>{obj.role}</td>
                        
                                    <td>
                                        <Link to={`/edituser/${obj.id}`} className="btn btn-outline-primary mx-2">Edit</Link>
                                        <button className="btn btn-danger mx-2" onClick={()=>deleteUser(obj.id)}>Delete</button>
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

export default UserList;