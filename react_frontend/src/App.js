import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

//Import components
import Login from './components/Login'
import Register from './components/Register'
import Header from './components/Header/Header'
import NavBar from './components/NavBar/NavBar'
import BidTrackMain from './components/BidTrackMain/BidTrackMain'
import BidTrackState from './context/trades/BidTrackState'

function App() {
  

  const authStatus = true


  return (
    <BidTrackState>
      <Router>
        <Switch>

          <Route exact path="/login" 
            render={props => !authStatus ? (
              <Login  />
            ) : (
              <Redirect to="/home" />
            )}/>
          
          
          <Route exact path="/register" 
            render={props => !authStatus ? (
              <Register  />
            ) : (
              <Redirect to="/home" />
          )}/>


          <Route exact path="/home" 
            render={props => authStatus ? (
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
    </BidTrackState>
  );
}

export default App;


/*
{...props} setAuth={setAuth}
{...props} setAuth={setAuth}
{...props} setAuth={setAuth}
*/