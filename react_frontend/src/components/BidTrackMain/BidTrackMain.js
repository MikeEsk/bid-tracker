import React, { useState, useEffect, useContext } from 'react'
import bidtrackContext from '../../context/trades/bidtrackContext'
import BidTrackContent from './BidTrackContent/BidTrackContent'
import BidTrackNav from './BidTrackNav/BidTrackNav'
import NavSelectAddTrade from './NavSelectAddTrade'

function BidTrackMain() {

    const bidContext = useContext(bidtrackContext)
    
    return (
        <div className='bidtrackmain'>
            <BidTrackNav/>
            <BidTrackContent/>
            {bidContext.showAddTrade && <NavSelectAddTrade/>}
        </div>
    )
}

export default BidTrackMain

