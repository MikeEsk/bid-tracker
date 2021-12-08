import React from 'react'
import { useContext } from 'react';
import bidtrackContext from '../../../../context/trades/bidtrackContext';
import BidLevel from './BidLevel';


function TradeLevel() {

    const bidContext = useContext(bidtrackContext)

    return (
        <div className='container'>
                <h1>{bidContext.selectedtrade !== 'default' ? bidContext.selectedtrade : 'Please select a trade'}</h1>
                {bidContext.tradebids.length > 0 ? <BidLevel bids={bidContext.tradebids} items={bidContext.bidlevelitems}/> : bidContext.selectedtrade !== 'default' && 'There are no bids'}
                <br></br>
        </div>

    )
}

export default TradeLevel
