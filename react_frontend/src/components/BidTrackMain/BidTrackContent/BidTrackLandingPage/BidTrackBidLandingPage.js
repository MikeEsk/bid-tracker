import React from 'react'

function BidTrackBidLandingPage(props) {
    return (
        <div className='bidtrack-landingpage' style={{color: props.color, fontSize: props.size}}>
            <h1>Welcome to Construction Bid Tracker!</h1>
            <h3>The premier website for tracking construction bids!</h3> 
            <br></br> 
            <h3>Please use the buttons above on the navigation bar to add bids and review a summary report of the lowest bidders.</h3>
        </div>
    )
}

export default BidTrackBidLandingPage
