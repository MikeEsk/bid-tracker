import React from 'react'
import bidtrackContext from '../../context/trades/bidtrackContext'
import { useContext} from 'react'
import { useState } from 'react'

function NavSelectAddTrade() {
    const bidContext = useContext(bidtrackContext)
    const [trade, setTrade] = useState('')
    
    const submitForm = (e) => {
        e.preventDefault()
        console.log(trade)
        bidContext.addTrade(trade)

        setTrade('Concrete, Steel, etc...')
    }
    
    return (
        //Show the form if the addTradeForm state is block
        <div className='navselectaddtrade-form'>
            <form onSubmit={submitForm} className='navselectaddtrade-form-container'>
                <h1>Add Trade</h1>
                <br></br>

                <input type='text' value={trade} placeholder='Concrete, Steel, etc...' name='trade' onChange={e => setTrade(e.target.value)} required/>
                <input type='submit' value="Add Trade" className='btn' style={{backgroundColor:'green'}}/>

                <button type='button' className='btn' style={{backgroundColor:'red'}} onClick={bidContext.toggleAddTrade}>Close</button>
            </form>
        </div>
    )
}

export default NavSelectAddTrade
