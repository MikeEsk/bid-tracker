import React from 'react'
import { FaPlus } from 'react-icons/fa';

function BidLevel(props) {
    
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });
    
    
    return (
        <div className = 'container'>
            {props.bids.map(bid => (
                
                <div className = 'bid'>
                    <h3>{bid.company} <FaPlus style={{ color: 'green', cursor: 'pointer'}} onClick= {() => alert(bid.bid_id)} /> </h3>
                    <p>Base Bid: {formatter.format(bid.price)} <span>Add Items</span> </p>

                    <ul>
                        {props.items.filter(item => (
                            item.bid_id === bid.bid_id
                        )).map(item => (
                            <li>Item: {item.item_name} <span>Price: {formatter.format(item.price)} </span></li>
                        ))}
                    </ul>

                    {/*
                    { showAddTradeItem && <AddTradeItem bid = {bid}/>}
                    */}
                
                </div>
            ))}
        </div>
    )
}

export default BidLevel
