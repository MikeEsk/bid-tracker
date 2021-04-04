import PropTypes from 'prop-types'

const Button = ({color, text, onClick}) => {
    
    return (
            <button style={{backgroundColor: color}} className='btn' onClick={onClick}> 
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

