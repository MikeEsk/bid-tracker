import React, { useContext } from 'react'
import { useLocation } from 'react-router'
import bidtrackContext from '../../context/trades/bidtrackContext'
import BidTrackContent from './BidTrackContent/BidTrackContent'
import BidTrackNav from './BidTrackNav/BidTrackNav'
import NavSelectAddTrade from './NavSelectAddTrade'
import NavSelectRemoveTrade from './NavSelectRemoveTrade'

function BidTrackMain() {

    const bidContext = useContext(bidtrackContext)
    const location = useLocation()
    
    return (
        <div className='bidtrackmain'>
            {location.pathname !== '/' && <BidTrackNav/>}
            <BidTrackContent/>
            {bidContext.showAddTrade && <NavSelectAddTrade/>}
            {bidContext.showRemoveTrade && <NavSelectRemoveTrade/>}
        </div>
    )
}

export default BidTrackMain

