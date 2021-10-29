import React from 'react'
import constphoto from '../../../../images/constphoto.jpg'

function BidTrackBidLandingPage() {
    const classchanges = {}

    if (window.matchMedia("only screen and (max-width: 760px)").matches) {
        classchanges.display ='inline';
        classchanges.color = 'black';
        classchanges.size = '15px';
        classchanges.top = 'auto'
        classchanges.left = 'auto'
    }   

    return (
        <React.Fragment>
            {classchanges.color !== 'black' && <img src={constphoto} alt="BidTrack Crane"/>}
            <div className='bidtrack-landingpage' style={{color: classchanges.color, fontSize: classchanges.size, display: classchanges.display, top: classchanges.top, left: classchanges.left}}>
                <h1>Welcome to Construction Bid Tracker!</h1>
                <h3>The premier website for tracking construction bids!</h3> 
                <br></br> 
                <h3>Please use the buttons above on the navigation bar to add bids and review a summary report of the lowest bidders.</h3>
            </div>
        </React.Fragment>
    )
}

export default BidTrackBidLandingPage
