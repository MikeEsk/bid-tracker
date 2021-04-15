import PropTypes from 'prop-types'

const AddBid = props => {
    return (
        <form className='add-form'>
            <div className='form-control'>
                <label>Company</label>
                <input type='text' placeholder='Add Company Name' />
            </div>
            <div className='form-control'>
                <label>Bid</label>
                <input type='text' placeholder='Add Bid' />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reviewed</label>
                <input type='checkbox' />
            </div>
            <input type='submit' value='Save Bid' className='btn btn-block'/>
        </form>
    )
}

AddBid.propTypes = {

}

export default AddBid
