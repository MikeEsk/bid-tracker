import React from 'react'
import bidtrackContext from '../../../../context/trades/bidtrackContext'
import TradeLevel from './TradeLevel'
import { useEffect, useContext } from 'react'

function BidTrackBidLevel() {
    
    const bidContext = useContext(bidtrackContext)
    
    useEffect(() => {
        const getLevelData = async () => {
            await bidContext.fetchTrades()
            await bidContext.fetchBids()
            await bidContext.fetchBidLevelItems()
        }
        getLevelData()
    }, [])
    
    return (   
        <TradeLevel/>
    )
}

export default BidTrackBidLevel
