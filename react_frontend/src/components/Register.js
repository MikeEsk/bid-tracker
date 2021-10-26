import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import bidtrackContext from "../context/trades/bidtrackContext";


function Register() {
    
    const [inputs, setInputs] = useState({email: "", user: "", password: ""})
    const { email, user, password } = inputs;
    const bidContext = useContext(bidtrackContext)

    const onChange = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    const submitForm = async event => {
        event.preventDefault()
        bidContext.registerUser(email, user, password)
    };

    return (
        <Fragment>
            <div className='header-main'>
                <h1>Welcome to Construction Bid Tracker!</h1>
            </div>
            
            <div className='login-page'>
                <div className='login-container'>
                    <h1>Please Register</h1>
                    <br></br>
                    <form onSubmit={submitForm} className='login'>
                        <label>Email</label>
                        <input type="text" name="email" value={email} onChange={event => onChange(event)}/>

                        <label>Name</label>
                        <input type="text" name="user" value={user} onChange={event => onChange(event)}/>

                        <label>Password</label>
                        <input type="password" name="password" value={password} onChange={event => onChange(event)}/>
                        <button>Submit</button>
                    </form>
                    <br></br>
                    <h4>Already a member?</h4>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </Fragment>
    );
};

export default Register;