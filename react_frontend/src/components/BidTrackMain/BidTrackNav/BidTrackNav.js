import React from 'react'
import { useContext } from 'react'
import bidtrackContext from '../../../context/trades/bidtrackContext'
import NavSelectAddTrade from '../NavSelectAddTrade'
import NavSelectHeader from './NavSelectHeader'
import NavSelectItems from './NavSelectItems'
import NavSelectTradeBtn from './NavSelectTradeBtn'

function BidTrackNav() {
    
    const bidContext = useContext(bidtrackContext)
    
    return (
        <div className='bidtracknav'>
            <NavSelectHeader/>
            <NavSelectItems trades={bidContext.trades} onClick={(e) => bidContext.loadTrade(e.target.textContent)}/>
            <NavSelectTradeBtn title='Add Trade' color='green' toggle={bidContext.toggleAddTrade}/>
            <NavSelectTradeBtn title='Remove Trade' color='red' toggle={bidContext.toggleRemoveTrade}/>
        </div>
    )
}

export default BidTrackNav
