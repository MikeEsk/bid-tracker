import React from 'react'
import { Link } from 'react-router-dom'

function NavBidsBtn() {
    return (
        <Link to='/bids'> 
            <button>Bids</button>
        </Link>
    )
}

export default NavBidsBtn
