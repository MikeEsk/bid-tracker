import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'

//Import components
import Header from './components/Header/Header'
import NavBar from './components/NavBar/NavBar'
import BidTrackMain from './components/BidTrackMain/BidTrackMain'
import BidTrackState from './context/trades/BidTrackState'

function App() {
  

  return (
    <BidTrackState>
      <Router>
          <Header />
          <NavBar/>
          <BidTrackMain/>
      </Router>
    </BidTrackState>
  );
}

export default App;
