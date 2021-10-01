import React from 'react'
import BidTrackTitle from './BidTrackTitle'
import LogInStatus from './LogInStatus/LogInStatus'
import RepoLink from './RepoLink'


function Header() {
    return (
        <div>
            <BidTrackTitle/>
            <LogInStatus/>
            <RepoLink/>
        </div>
    )
}

export default Header
