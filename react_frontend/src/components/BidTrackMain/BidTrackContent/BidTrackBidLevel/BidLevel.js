import React, { useState, useContext } from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa';
import bidtrackContext from '../../../../context/trades/bidtrackContext';

function BidLevel(props) {
    
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });

    const [itemInputs, setItemInput] = useState({item_name: '', price: '', bid_id: ''})

    const bidContext = useContext(bidtrackContext)

    const onChange = e => {
        setItemInput({...itemInputs, [e.target.name]: e.target.value})
    }

    const submitItemForm = e => {
        e.preventDefault()

        let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
        
        if(!itemInputs.price) {
            alert('Please add a price')
            return
        }
        
        if(isNaN(itemInputs.price) || (spChars.test(itemInputs.price))) {
            alert('Please enter a valid price')
            return
        }

        if(!itemInputs.item_name) {
            alert('Please add an item name')
            return
        }

        bidContext.addLevelItem(itemInputs)
        setItemInput({item_name: '', price: '', bid_id: ''})
    }

    const setForm = (id, company) => {
        setItemInput({item_name: '', price: '', bid_id: id})
    }

    const bidSum = (bid) => {
        //Get total price adding up base bid and items
        let totalprice = parseInt(bid.price)
        props.items.filter(item => (item.bid_id === bid.bid_id)).forEach(item => totalprice += parseInt(item.price))
        return formatter.format(totalprice)
    }

    const [hoverID, setHoverID] = useState(false)
    
    const displayDelete = e => {
        //document.getElementsByName(`deletebutton${e.target.id}`)[0].style.display = 'block'
        setHoverID(parseInt(e.target.id))
    }
    
    const hideDelete = e => {
        //document.getElementsByName(`deletebutton${e.target.id}`)[0].style.display = 'none'
        setHoverID(false)
    }
    
    const deleteItem = () => {
        bidContext.deleteItem(hoverID)
    }


    return (
        <React.Fragment>
            {props.bids.map(bid => (
                
                <div className = 'bid' key={bid.bid_id}>
                    <h3 style={{borderBottom:'solid 1px'}}>
                        {bid.company}
                        {(bid.bid_id === itemInputs.bid_id) ? 
                            <div style={{display:'flex', alignContent:'center'}}>
                                <span style={{fontSize:'12px', paddingRight: '10px'}}>Close </span>
                                <FaTimes style={{ color: 'red', cursor: 'pointer'}} onClick= {() => setForm('')}/>
                            </div>
                            : 
                            <div style={{display:'flex', alignContent:'center'}}>
                                <span style={{fontSize:'12px', paddingRight: '10px'}}>Add Items </span>
                                <FaPlus style={{ color: 'green', cursor: 'pointer'}} onClick= {() => setForm(bid.bid_id)}/>
                            </div>
                        }
                    </h3>
                    <div className = 'bidlevelitem'>    
                        <p>Base Bid: {formatter.format(bid.price)} </p>

                        <div className = 'itemlist'>
                            {props.items.filter(item => (
                                item.bid_id === bid.bid_id
                            )).map(item => (
                                <div className = 'item' key={item.item} id={item.item} onMouseEnter={e => displayDelete(e)} onMouseLeave={e => hideDelete(e)}>
                                        <p id={item.item} style={{marginLeft:'20px'}}>Item: {item.item_name}</p>
                                        <p id={item.item} style={{marginLeft:'20px'}}>Price: {formatter.format(item.price)}</p>
                                        <FaTimes style={{ color: 'red', cursor: 'pointer', margin: '5px 10px 5px auto', display: `${hoverID === item.item ? 'flex' : 'none'}`}} onClick= {() => deleteItem()}/>
                                </div>
                            ))}
                            {(bid.bid_id === itemInputs.bid_id) && 
                                <form className= 'itemform' onSubmit={submitItemForm}>
                                    <label>Item</label>
                                    <input type='text' value={itemInputs.item_name} name='item_name' autoComplete='off' onChange={(e) => onChange(e)}/>

                                    <label>Price</label>
                                    <input type='text' value={itemInputs.price} name='price' autoComplete='off' onChange={(e) => onChange(e)}/>

                                    <button>Add Item</button>
                                </form>
                                
                            }
                        </div>

                        {(bidSum(bid) !== formatter.format(bid.price)) && <p>Total Bid: {bidSum(bid)}</p>}
                    </div>
                </div>
            ))}
        </React.Fragment>
    )
}

export default BidLevel
