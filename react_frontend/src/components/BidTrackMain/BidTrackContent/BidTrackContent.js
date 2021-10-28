import React from 'react'
import { Route } from 'react-router'
import BidTrackLandingPage from './BidTrackLandingPage/BidTrackBidLandingPage'
import BidTrackBids from './BidTrackBids/BidTrackBids'
import BidTrackBidSum from './BidTrackBidSum/BidTrackBidSum'
import BidTrackBidLevel from './BidTrackBidLevel/BidTrackBidLevel'
import BidTrackAbout from './BidTrackAbout/BidTrackAbout'
import Footer from './Footer'

function BidTrackContent() {
    return (
        <div className='bidtrackcontent-container'>
            <div className='bidtrackcontent'>
                <Route path='/' exact render={() => (<BidTrackLandingPage color={window.matchMedia("only screen and (max-width: 760px)").matches ? 'black' : 'white'}/>)}/>
                <Route path='/bids' exact render={() => (<BidTrackBids/>)}/>
                <Route path='/bidsummary' exact render={() => (<BidTrackBidSum/>)}/>
                <Route path='/bidleveling' exact render={() => (<BidTrackBidLevel/>)}/>
                <Route path='/about' exact render={() => (<BidTrackAbout/>)}/>
            </div>
            <Footer/>
        </div>
    )
}

export default BidTrackContent
