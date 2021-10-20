import React from 'react'
import { Route } from 'react-router'

function NavSelectHeader() {
    return (
        <div className='navselectheader'>
            <Route path='/bids' exact render={() => (<div >Trades</div>)}/>
            <Route path='/bidsummary' exact render={() => (<div>Summary Options</div>)}/>
            <Route path='/bidleveling' exact render={() => (<div>Trades</div>)}/>
            <Route path='/about' exact render={() => (<div>Links</div>)}/>
        </div>
    )
}

export default NavSelectHeader
