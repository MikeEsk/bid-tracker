import PropTypes from 'prop-types'
import {useState} from 'react'

const AddBid = ({ onAdd }) => {
    const [company, setCompany] = useState('')
    const [bid, setBid] = useState('')
    const [reviewed, setReviewed] = useState(false)

    const onSubmit = e => {
        e.preventDefault()
        
        if(!bid) {
            alert('Please add a bid')
            return
        }

        onAdd({company, bid, reviewed})

        setCompany('')
        setBid('')
        setReviewed(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Company</label>
                <input type='text' value={company} placeholder='Add Company Name' onChange={e => setCompany(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Bid</label>
                <input type='text' value={bid} placeholder='Add Bid' onChange={e => setBid(e.target.value)}/>
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
