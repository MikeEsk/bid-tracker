import {FaTimes} from 'react-icons/fa'
import React from 'react'

const Bid = ({bid, onDelete, onToggle}) => {
    return (
        <div className={`bid ${bid.reviewed ? 'reviewed': ''}`} onDoubleClick={() => onToggle(bid.bid_id)}>
            <h3>{bid.company} <FaTimes style={{ color: 'red', cursor: 'pointer'}} onClick= {() => onDelete(bid.bid_id)} /></h3>
            <p>{bid.price}</p>
            
        </div>
    )
}

export default Bid
