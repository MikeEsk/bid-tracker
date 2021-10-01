import PropTypes from 'prop-types'
import React from 'react'

const Button = ({color, text, toggleShowAddBid}) => {
    
    return (
            <button style={{backgroundColor: color}} className='btn' onClick={toggleShowAddBid}> 
                {text} 
            </button>
    )
}

export default Button

Button.defaultProps = {
    color: 'steelblue',
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

