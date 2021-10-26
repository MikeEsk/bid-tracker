import React from 'react'
import { useContext } from 'react'
import bidtrackContext from '../../../context/trades/bidtrackContext'


function UserLabel() {

    const bidContext = useContext(bidtrackContext)

    return (
        <h2>{bidContext.user_name}</h2>
    )
}

export default UserLabel
