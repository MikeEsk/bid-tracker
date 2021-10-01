import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import axios from 'axios'

//Import components
import Header from './components/Header/Header'
import NavBar from './components/NavBar/NavBar'
import BidTrackMain from './components/BidTrackMain/BidTrackMain'

//Context
//import TradesState from './context/trades/TradesState'



function App() {
  
    //state
  const [showAddBid, setShowAddBid] = useState (false)
  const [bids, setBids] = useState([])
  
  //State for trades
  //Have trades initialized and have ability to add or remove trades
  


  useEffect(() => {
    const getBids = async () => {
      const bidsFromServer = await fetchBids()
      setBids(bidsFromServer)
    }

    getBids()
    
  }, [])

  //Fetch All Bids
  const fetchBids = async () => {
    const res = await fetch('http://localhost:5000/bids')
    const data = await res.json()
    return data
  }

  //Fetch Single Bid
  const fetchBid = async (id) => {
    const res = await fetch(`http://localhost:5000/bids/${id}`)
    const data = await res.json()
    return data
  }


  //Add a Bid
  const addBid = async (bid) => {
    const response = await fetch('http://localhost:5000/bids/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(bid)
    })

    const data = await response.json()
    setBids([...bids, data])
  }
  
  //Delete a bid
  const deleteBid = async (id) => {
    await fetch(`http://localhost:5000/bids/${id}`, {
      method: 'DELETE',
    })

    setBids(bids.filter((bid) => bid.id !== id))
  }

  //Toggle if bid has been reviewed
  const toggleReviewed = async (id) => {
    
    const bidToToggle = await fetchBid(id)
    const bid_updated = {...bidToToggle, reviewed: !bidToToggle.reviewed} 
    
    const response = await fetch(`http://localhost:5000/bids/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(bid_updated)
    })

    const data = await response.json()

    setBids(bids.map((bid) => bid.id === id ? {...bid, reviewed: data.reviewed} : bid))
  }

  //Placeholder for trade
  const trade = 'Trade';

  const props = []


  return (
    //<TradesState>
      <Router>
        <div className="header">
          <Header />
        </div>

        <div className="navbar">
          <NavBar/>
        </div>

        <div className="bidtrackmain">
          <BidTrackMain showAddBid={showAddBid} trade={trade} bids={bids} setShowAddBid={setShowAddBid} addBid={addBid} deleteBid={deleteBid} toggleReviewed={toggleReviewed}/>
        </div>

      </Router>
    //</TradesState>
  );
}

export default App;
