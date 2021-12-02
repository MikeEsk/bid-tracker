import React, { useState, useContext } from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa';
import bidtrackContext from '../../../../context/trades/bidtrackContext';

function BidLevel(props) {
    
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });

    const [itemInputs, setItemInput] = useState({item: '', price: '', bid_id: '', company: ''})

    const bidContext = useContext(bidtrackContext)

    const onChange = e => {
        setItemInput({...itemInputs, [e.target.name]: e.target.value})
    }

    const submitItemForm = e => {
        e.preventDefault()
        bidContext.addItem(itemInputs)
        setItemInput({item: '', price: '', bid_id: '', company: ''})
    }

    const setForm = (id, company) => {
        setItemInput({item: '', price: '', bid_id: id, company: company})
    }
    
    return (
        <div className = 'container'>
            {props.bids.map(bid => (
                
                <div className = 'bid'>
                    <h3>
                            {bid.company}
                            {(bid.bid_id === itemInputs.bid_id) ? 
                                <div style={{display:'flex', alignContent:'center'}}>
                                    <span style={{fontSize:'12px', paddingRight: '10px'}}>Close </span>
                                    <FaTimes style={{ color: 'red', cursor: 'pointer'}} onClick= {() => setForm('', '')}/>
                                </div>
                                 : 
                                <div style={{display:'flex', alignContent:'center'}}>
                                    <span style={{fontSize:'12px', paddingRight: '10px'}}>Add Items </span>
                                    <FaPlus style={{ color: 'green', cursor: 'pointer'}} onClick= {() => setForm(bid.bid_id, bid.company)}/>
                                </div>
                            }
                    </h3>
                    <p>Base Bid: {formatter.format(bid.price)} </p>

                    <ul>
                        {props.items.filter(item => (
                            item.bid_id === bid.bid_id
                        )).map(item => (
                            <li>Item: {item.item_name} <span>Price: {formatter.format(item.price)} </span></li>
                        ))}
                        {(bid.bid_id === itemInputs.bid_id) && 
                            <form className= 'itemform' onSubmit={submitItemForm}>
                                <label>Item</label>
                                <input type='text' value={itemInputs.item} name='item' autoComplete='off' onChange={(e) => onChange(e)}/>

                                <label>Price</label>
                                <input type='text' value={itemInputs.price} name='price' autoComplete='off' onChange={(e) => onChange(e)}/>

                                <button>Add Item</button>
                            </form>
                            
                        }
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
