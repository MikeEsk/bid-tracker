import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { useEffect, useContext } from 'react'

//Import components
import Login from './Login'
import Register from './Register'
import Header from './Header/Header'
import NavBar from './NavBar/NavBar'
import BidTrackMain from './BidTrackMain/BidTrackMain'
import bidtrackContext from '../context/trades/bidtrackContext'

function BidTrack() {

    const bidContext = useContext(bidtrackContext)

    useEffect(() => {
        bidContext.loadUser()
    }, [])

    return (
        <React.Fragment>
            <Router>
                <Switch>

                    <Route exact path="/login" 
                        render={() => !bidContext.authStatus ? (
                        <Login  />
                        ) : (
                        <Redirect to="/home" />
                        )}/>
                    
                    
                    <Route exact path="/register" 
                        render={() => !bidContext.authStatus ? (
                        <Register  />
                        ) : (
                        <Redirect to="/home" />
                    )}/>


                    <Route exact path="/home" 
                        render={() => bidContext.authStatus ? (
                            <React.Fragment >
                                <Router>
                                    <Header />
                                    <NavBar/>
                                    <BidTrackMain/>
                                </Router>
                            </React.Fragment>
                        ) : (
                        <Redirect to="/login" />
                        )}/>

                </Switch>
            </Router>
        </React.Fragment>
  );
}

export default BidTrack;
