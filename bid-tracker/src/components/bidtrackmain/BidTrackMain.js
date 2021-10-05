import React from 'react'
import BidTrackContent from './BidTrackContent/BidTrackContent'
import BidTrackNav from './BidTrackNav/BidTrackNav'

function BidTrackMain(props) {
    return (
        <div className='bidtrackmain'>
            <BidTrackNav/>
            <BidTrackContent {...props}/>
        </div>
    )
}

export default BidTrackMain

