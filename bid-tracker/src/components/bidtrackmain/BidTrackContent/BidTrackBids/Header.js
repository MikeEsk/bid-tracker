import PropTypes from 'prop-types'
import {useLocation} from 'react-router-dom'
import Button from './Button.js'
import React from 'react'


const TradeTitle = ({ title, toggleShowAddBid, showAddBid }) => {
    const location = useLocation()
    
    return (
        <header className ='header'>
            <h1>{title}</h1>
            {location.pathname === '/' && (<Button color={showAddBid ? 'red': 'green'} text={showAddBid ? 'Close Bid': 'Add A Bid'} toggleShowAddBid={toggleShowAddBid}/>)}
        </header>
    )
}

TradeTitle.defaultProps = {
    title: 'Bid Tracker',
}

TradeTitle.propTypes = {
    title: PropTypes.string.isRequired,
}

export default TradeTitle
