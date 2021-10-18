import React from 'react'
import { useContext } from 'react'
import bidtrackContext from '../../../context/trades/bidtrackContext'
import NavSelectAddTrade from '../NavSelectAddTrade'
import NavSelectHeader from './NavSelectHeader'
import NavSelectItems from './NavSelectItems'
import NavSelectTradeAddBtn from './NavSelectTradeAddBtn'

function BidTrackNav() {
    
    const bidContext = useContext(bidtrackContext)
    
    return (
        <div className='bidtracknav'>
            <NavSelectHeader/>
            <NavSelectItems trades={bidContext.trades} onClick={(e) => bidContext.loadTrade(e.target.textContent)}/>
            <NavSelectTradeAddBtn/>
        </div>
    )
}

export default BidTrackNav
