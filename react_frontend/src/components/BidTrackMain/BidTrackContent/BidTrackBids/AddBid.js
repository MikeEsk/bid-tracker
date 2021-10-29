import {useState} from 'react'
import React from 'react'

const AddBid = ({ onAdd, trade }) => {
    const [company, setCompany] = useState('')
    const [price, setPrice] = useState('')
    const [formattedprice, setFormattedPrice] = useState('')
    const [reviewed, setReviewed] = useState(false)
    
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });

    const onSubmit = e => {
        e.preventDefault()
        
        let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
        
        if(!price) {
            alert('Please add a price')
            return
        }
        
        if(isNaN(price) || (spChars.test(price))) {
            alert('Please enter a valid price')
            return
        }

        if(!company) {
            alert('Please add a company name')
            return
        }

        onAdd({trade, company, price, reviewed})

        setCompany('')
        setPrice('')
        setReviewed(false)
        setFormattedPrice('')
        
    }

    const updatePrices = value => {
        let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

        setPrice(value)
        
        if (isNaN(value) || (spChars.test(value))) {
            setFormattedPrice('Please enter a valid number (No commas or decimals)')
        }
        else {
            setFormattedPrice(formatter.format(value))
        }
    }


    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Company</label>
                <input type='text' value={company} placeholder='Company Name' onChange={e => setCompany(e.target.value)}/>
            </div>
            <div className='form-control-price-container'>
                <div>Bid: {formattedprice}</div>
                <div  style={{marginTop:'0px'}} className='form-control'>
                    <input type='text' value={price} placeholder='Price' onChange={e => updatePrices(e.target.value)}/>
                </div>
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reviewed</label>
                <input type='checkbox' checked={reviewed} value={reviewed} onChange={e => setReviewed(e.currentTarget.checked)}/>
            </div>
            <input type='submit' value='Save Bid' className='btn btn-block'/>
        </form>
    )
}

AddBid.propTypes = {
    
}

export default AddBid
