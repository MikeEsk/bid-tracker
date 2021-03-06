import React from 'react'
import Trade from './Trade'
import bidtrackContext from '../../../../context/trades/bidtrackContext';
import { useContext } from 'react';
import { useEffect } from 'react';


function BidTrackBids() {

    const bidContext = useContext(bidtrackContext);
    
    useEffect(() => {
        bidContext.loadUser()
        const getTrades = async () => {
            await bidContext.fetchTrades();
        }
        getTrades()
    }, [])


    return (
        <div className="container">
          <Trade/>
        </div>
    )
}

export default BidTrackBids

