import PropTypes from 'prop-types'
import {useLocation} from 'react-router-dom'
import Button from './Button.js'
import React from 'react'


const Header = ({ title, toggleShowAddBid, showAddBid }) => {
    const location = useLocation()
    
    return (
        <header className ='header'>
            <h1>{title}</h1>
            {location.pathname === '/' && (<Button color={showAddBid ? 'red': 'green'} text={showAddBid ? 'Close Bid': 'Add A Bid'} toggleShowAddBid={toggleShowAddBid}/>)}
        </header>
    )
}

Header.defaultProps = {
    title: 'Bid Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
