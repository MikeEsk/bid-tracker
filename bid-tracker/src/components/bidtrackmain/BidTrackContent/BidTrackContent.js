import React from 'react'
import BidTrackLandingPage from './BidTrackLandingPage/BidTrackBidLandingPage'
import BidTrackBids from './BidTrackBids/BidTrackBids'
import BidTrackBidSum from './BidTrackBidSum/BidTrackBidSum'
import BidTrackBidLevel from './BidTrackBidLevel/BidTrackBidLevel'
import BidTrackAbout from './BidTrackAbout/BidTrackAbout'

function BidTrackContent(props) {
    return (
        <div>
            <BidTrackLandingPage/>
			<BidTrackBids {...props}/>
			<BidTrackBidSum/>
			<BidTrackBidLevel/>
			<BidTrackAbout/>
        </div>
    )
}

export default BidTrackContent
