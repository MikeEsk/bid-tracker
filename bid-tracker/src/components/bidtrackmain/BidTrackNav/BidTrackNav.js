import React from 'react'
import NavSelectHeader from './NavSelectHeader'
import NavSelectItems from './NavSelectItems'
import NavSelectTradeAddBtn from './NavSelectTradeAddBtn'

function BidTrackNav() {
    return (
        <div className='bidtracknav'>
            <NavSelectHeader/>
            <NavSelectItems/>
            <NavSelectTradeAddBtn/>
        </div>
    )
}

export default BidTrackNav
