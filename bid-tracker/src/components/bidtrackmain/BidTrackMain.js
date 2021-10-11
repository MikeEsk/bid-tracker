import React, { useState, useEffect, useContext } from 'react'
import BidTrackContent from './BidTrackContent/BidTrackContent'
import BidTrackNav from './BidTrackNav/BidTrackNav'

function BidTrackMain() {

    return (
        <div className='bidtrackmain'>
            <BidTrackNav/>
            <BidTrackContent/>
        </div>
    )
}

export default BidTrackMain

