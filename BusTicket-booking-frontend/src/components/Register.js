import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { REST_API_BASE_URL } from "../utils/AxiosInteraction";
import axios from "axios";
import Navbar from "./Navbar";

const Register = () => {

     let navigate = useNavigate();

     const[addUser, setAddUser] = useState({
        name:"",
        email:"",
        password:"",
        phoneNo:"",
        role:""
    });
    const[error, setError] = useState("");

    const handleInputChange = (e) => {
        setAddUser((prevState) => {
            return {...prevState, [e.target.name]:e.target.value}
        })
    }

     const onSubmit= async(e)=>{

        e.preventDefault();     //to prevent the page from loading on click of submit
        try{
            if(!addUser.name || !addUser.email || !addUser.password || !addUser.phoneNo || !addUser.role){
                setError("Please fill in all the details");
                return;
            }
            const response = await axios.post(REST_API_BASE_URL + "/register",addUser);
            console.log("sign up ",response.data);
            if(response.data === "User registered successfully"){
                navigate("/page/login");   //navigate to login page once Registered
            }
        }
        catch(error){
            console.error("Signup failed ",error);
            setError(error.response ? error.response.data.error : error.message);
        }
       
    }

    return(
        <>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-md-4 offset-md-4 border rounded p-4 mt-3 shadow">
                    <h2 className="text-center m-4">SignUp</h2>
                    {error && <p className="alert alert-danger">{error}</p>}
                  <form onSubmit={(e)=>onSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" value={addUser.name} onChange={(e)=>handleInputChange(e)} className="form-control" name="name" placeholder="enter your name"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" value={addUser.email} onChange={(e)=>handleInputChange(e)} className="form-control" name="email" placeholder="enter the email"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" value={addUser.password} onChange={(e)=>handleInputChange(e)} className="form-control" name="password" placeholder="enter the password"/>
                    </div>
                     <div className="mb-3">
                        <label htmlFor="phoneNo" className="form-label">Phone No</label>
                        <input type="number" value={addUser.phoneNo} onChange={(e)=>handleInputChange(e)} className="form-control" name="phoneNo" placeholder="enter the mobile number"/>
                    </div>
                    <div className="mb-3">
                        <p>Role</p>
                        <div className="form-check form-check-inline">
                            <input type="radio" value="user" name="role" checked={addUser.role === "user"} onChange={(e)=>handleInputChange(e)} className="form-check-input"/>
                            <label className="form-check-label" htmlFor="role">User</label>
                        </div>
                        <div className="form-check form-check-inline">
                             <input type="radio" value="admin" name="role" checked={addUser.role === "admin"} onChange={(e)=>handleInputChange(e)} className="form-check-input"/>
                             <label className="form-check-label" htmlFor="role">Admin</label>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-outline-primary me-2">Register</button>
                        <Link to="/" className="btn btn-outline-danger mx-2">Cancel</Link>
                    </div>
                  </form>

                </div>
            </div>
        </div>
        </>
    )
}

export default Register;