import React from 'react'
import Bid from './Bid'

const Bids = ({bids, onDelete, onToggle}) => {

    return (
        <React.Fragment>
            {bids.map((bid) => (
                <Bid key={bid.bid_id} bid = {bid} onDelete ={onDelete} onToggle={onToggle}/>
                )
            )}
        </React.Fragment>
    )
}

export default Bids
