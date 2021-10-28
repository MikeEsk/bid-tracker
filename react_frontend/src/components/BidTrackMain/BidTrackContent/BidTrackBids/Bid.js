import {FaTimes} from 'react-icons/fa'
import React from 'react'

const Bid = ({bid, onDelete, onToggle}) => {
    
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });
    
    return (
        <div className={`bid ${bid.reviewed ? 'reviewed': ''}`} onDoubleClick={() => onToggle(bid.bid_id)}>
            <h3>{bid.company} <FaTimes style={{ color: 'red', cursor: 'pointer'}} onClick= {() => onDelete(bid.bid_id)} /></h3>
            <p>{formatter.format(bid.price)}</p>
            
        </div>
    )
}

export default Bid
