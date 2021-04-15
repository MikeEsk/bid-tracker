import { useState } from 'react'
import Header from './components/Header'
import Bids from './components/Bids'
import AddBid from './components/AddBid'




function App() {
  const [bids, setBids] = useState([
    {
        id: 1, 
        company: 'Bob the Builder',
        price: '$25,000',
        reviewed: true,
    },
    {
        id: 2, 
        company: 'Stan Consruction',
        price: '$30,000',
        reviewed: true,
    },    
    {   
        id: 3, 
        company: 'Brick N Mortar Erectors',
        price: '$32,000',
        reviewed: false,
    }
  ])

  //Delete a bid
  const deleteBid = (id) => {
    setBids(bids.filter((bid) => bid.id !== id))
  }

  //Toggle if bid has been reviewed
  const toggleReviewed = (id) => {
    setBids(bids.map((bid) => bid.id === id ? {...bid, reviewed: !bid.reviewed}: bid))
  }

  return (
    <div className="container">
      <Header />
      <AddBid />
      {bids.length > 0 ? <Bids bids = {bids} onDelete={deleteBid} onToggle={toggleReviewed}/>: 'There are no bids'}
    </div>
    
  );
}

export default App;
