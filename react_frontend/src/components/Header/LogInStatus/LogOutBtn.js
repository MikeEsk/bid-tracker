import React from 'react'
import { useContext } from 'react'
import bidtrackContext from '../../../context/trades/bidtrackContext'

function LogOutBtn() {

    const bidContext = useContext(bidtrackContext)

    const logout = () => {
        bidContext.logoutUser()
    }
    
    return (
            <button className='btn' onClick={logout}>Log Out</button>
    )
}

export default LogOutBtn


//onClick={bidContext.logoutUser()}