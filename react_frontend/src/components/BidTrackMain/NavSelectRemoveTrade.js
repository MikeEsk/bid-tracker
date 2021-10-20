import React from 'react'
import bidtrackContext from '../../context/trades/bidtrackContext'
import { useContext} from 'react'
import { useState } from 'react'

function NavSelectRemoveTrade() {
    const bidContext = useContext(bidtrackContext)
    const [trade, setTrade] = useState('')
    
    const submitForm = (e) => {
        e.preventDefault()
        bidContext.removeTrade(trade)
        setTrade('')
    }
    
    return (
        //Show the form if the addTradeForm state is block
        <div className='navselectaddtrade-form'>
            <form onSubmit={submitForm} className='navselectaddtrade-form-container'>
                <h1>Remove Trade</h1>
                <br></br>

                <input type='text' value={trade} placeholder='Concrete, Steel, etc...' name='trade' autoComplete='off' onChange={e => setTrade(e.target.value)} required/>
                <input type='submit' value="Remove Trade" className='btn' style={{backgroundColor:'green'}}/>

                <button type='button' className='btn' style={{backgroundColor:'red'}} onClick={bidContext.toggleRemoveTrade}>Close</button>
            </form>
        </div>
    )
}

export default NavSelectRemoveTrade
