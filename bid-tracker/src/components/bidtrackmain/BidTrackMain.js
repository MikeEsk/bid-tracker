import React from 'react'
import BidTrackContent from './BidTrackContent/BidTrackContent'
import BidTrackNav from './BidTrackNav/BidTrackNav'

function BidTrackMain(props) {
    return (
        <div>
            <BidTrackContent {...props}/>
            <BidTrackNav/>
        </div>
    )
}

export default BidTrackMain

