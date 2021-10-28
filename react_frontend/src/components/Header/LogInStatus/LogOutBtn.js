import React from 'react'
import { useContext } from 'react'
import bidtrackContext from '../../../context/trades/bidtrackContext'

function LogOutBtn() {

    const bidContext = useContext(bidtrackContext)

    const logout = () => {
        bidContext.logoutUser()
    }
    
    return (
            <span className='btn btn-logout' onClick={logout}>Log Out</span>
    )
}

export default LogOutBtn


//onClick={bidContext.logoutUser()}