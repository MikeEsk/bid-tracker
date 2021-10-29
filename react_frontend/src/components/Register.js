import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import bidtrackContext from "../context/trades/bidtrackContext";
import Footer from '../components/BidTrackMain/BidTrackContent/Footer'


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
                    <i>This website is for portfolio demonstration purposes.  A fictitious email may be used.</i>
                    <br></br>
                    <form onSubmit={submitForm} className='login'>
                        <label>Email</label>
                        <input type="text" name="email" value={email} onChange={event => onChange(event)} autoComplete="off"/>

                        <label>Name</label>
                        <input type="text" name="user" value={user} onChange={event => onChange(event)} autoComplete="off"/>

                        <label>Password</label>
                        <input type="password" name="password" value={password} onChange={event => onChange(event)} autoComplete="off"/>
                        <button>Submit</button>
                    </form>
                    <br></br>
                    <h4>Already a member?</h4>
                    <Link to="/login">Login</Link>
                    <br></br>
                    <br></br>
                    <Footer/>
                </div>
            </div>
        </Fragment>
    );
};

export default Register;