import React from 'react'
import bidtrackContext from '../../../context/trades/bidtrackContext'
import { useContext } from 'react'

function NavSelectTradeAddBtn() {

    const bidContext = useContext(bidtrackContext)

    return (
        <button className='btn' style={{backgroundColor: "#596869"}} onClick={bidContext.toggleAddTrade}>Add Trade</button>
    )
}

export default NavSelectTradeAddBtn
