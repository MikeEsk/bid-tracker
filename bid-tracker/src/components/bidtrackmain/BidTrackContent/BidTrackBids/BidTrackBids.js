import React from 'react'
import Trade from './Trade'

function BidTrackBids(props) {
    return (
        <div className="container">
          <Trade {...props}/>
        </div>
    )
}

export default BidTrackBids

//showAddBid={props.showAddBid} trade={props.trade} bids={props.bids} setShowAddBid={props.setShowAddBid} addBid={props.addBid} deleteBid={props.deleteBid} toggleReviewed={props.toggleReviewed}
