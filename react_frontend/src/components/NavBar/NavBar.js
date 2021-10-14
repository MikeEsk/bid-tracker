import React from 'react'
import NavAboutBtn from './NavAboutBtn'
import NavBidLevelBtn from './NavBidLevelBtn'
import NavBidsBtn from './NavBidsBtn'
import NavBidSumBtn from './NavBidSumBtn'

function NavBar() {
    return (
        <div className='navbar'>
           <NavBidsBtn/>
           <NavBidSumBtn/>
           <NavBidLevelBtn/>
           <NavAboutBtn/>
        </div>
    )
}

export default NavBar
