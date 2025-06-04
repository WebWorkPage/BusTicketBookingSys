import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { REST_API_BASE_URL, setAuthHeader } from "../utils/AxiosInteraction";
import axios from "axios";
import Navbar from "./Navbar";

const Login = () => {

    let navigate = useNavigate();

    // const[role, setRole] = useState("");
    // const[user, setUser] = useState("");
    const[token, setToken] = useState(localStorage.getItem("token") || "");
    const[error, setError] = useState("");
    const[login, setLogin] = useState({
        email:"",
        password:""
    })

    const handleInputChange = (e) => {
        setLogin((prevState) => {
            return {...prevState,[e.target.name]:e.target.value}
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
             if(!login.email || !login.password){
                setError("Please enter both the email and password");
                return;
              }
              const response = await axios.post(REST_API_BASE_URL + "/page/login", login
            //    {
            //     headers: {
            //          'Authorization': `Basic ${btoa(login.email + ':' + login.password)}`,
            //          'X-Requested-With': 'XMLHttpRequest',
            //          "Content-Type": "application/json",
            //      }  
            //    }
              );
              console.log('Login successful:', response.data);
              if(response.data != null) {
                    localStorage.setItem("token", response.data.token);
                    setAuthHeader();
                    setToken(response.data.token);
                    // setUser(response.data.user);
                    navigate("/dashboard", { state:{ User: response.data.user_name, UserId: response.data.user_id, Token: response.data.token, Role: response.data.role} } );
                    return;
              }
            //   else{
            //     setError('Invalid credentials');
            //   }
        }
        catch(error){
              console.error("login failed ", error);
              setError(error.response.data ? error.response.data.error : error.message);
        }
       
    }

    return(
        <>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-md-4 offset-md-4 border rounded p-3 mt-5 shadow">
                    <h2 className="text-center m-4">Login</h2>
                    {error && <p className="alert alert-danger">{error}</p>}
                  <form onSubmit={(e)=>onSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" value={login.email} onChange={(e)=>handleInputChange(e)} className="form-control" name="email" placeholder="enter your email Id"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" value={login.password} onChange={(e)=>handleInputChange(e)} className="form-control" name="password" placeholder="enter your last name"/>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-outline-primary me-2">Login</button>
                        <Link to="/" className="btn btn-outline-danger mx-2">Cancel</Link>
                    </div>
                  </form>

                </div>
            </div>
        </div>
        </>
    )
}

export default Login;