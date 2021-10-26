import React from 'react'
import { Route } from 'react-router'
import constphoto from '../../../images/constphoto.jpg'

function NavSelectHeader() {
    return (
        <React.Fragment>
            <Route path='/' exact render={() => (<img src={constphoto} alt="BidTrack Crane"/>)}/>
            <div className='navselectheader'>
                <Route path='/bids' exact render={() => (<div >Trades</div>)}/>
                <Route path='/bidsummary' exact render={() => (<div>Summary Options</div>)}/>
                <Route path='/bidleveling' exact render={() => (<div>Trades</div>)}/>
                <Route path='/about' exact render={() => (<div>Links</div>)}/>
            </div>
        </React.Fragment>
    )
}

export default NavSelectHeader
