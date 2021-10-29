import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useContext } from "react";
import bidtrackContext from "../context/trades/bidtrackContext";
import Footer from '../components/BidTrackMain/BidTrackContent/Footer'


function Login() {
    
    
    const [inputs, setInputs] = useState({email: "", password: ""})
    const { email, password } = inputs;
    const bidContext = useContext(bidtrackContext)

    const onChange = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    const submitForm = async event => {
        event.preventDefault()
        bidContext.loginUser(email, password)
    };

    return (
        <Fragment>
            <div className='header-main'>
                <h1>Welcome to Construction Bid Tracker!</h1>
            </div>
            
            <div className='login-page'>
                <div className='login-container'>
                    <h1>Please Login</h1>
                    <br></br>
                    <form onSubmit={submitForm} className='login'>
                        <label>Email</label>
                        <input type="text" name="email" value={email} onChange={event => onChange(event)} autoComplete="off"/>

                        <label>Password</label>
                        <input type="password" name="password" value={password} onChange={event => onChange(event)} autoComplete="off"/>
                        <button>Submit</button>
                    </form>
                    <br></br>
                    <h4>Not a member?</h4>
                    <Link to="/register">Register</Link>
                    <br></br>
                    <br></br>
                    <Footer/>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;