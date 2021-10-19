import PropTypes from 'prop-types'
import {useLocation} from 'react-router-dom'
import Button from './Button.js'
import React from 'react'
import bidtrackContext from '../../../../context/trades/bidtrackContext.js'
import { useContext } from 'react'


const TradeTitle = ({ title, toggleShowAddBid, showAddBid }) => {
    
    const bidContext = useContext(bidtrackContext)
    const location = useLocation()
    
    return (
        <header className ='header'>
            {title==='default' ? <h1>Please Select a Trade</h1> : <h1>{title}</h1>}
            {location.pathname === '/bids' && bidContext.selectedtrade !== 'default' && <Button color={showAddBid ? 'red': 'green'} text={showAddBid ? 'Close Bid Form': 'Add A Bid'} toggleShowAddBid={toggleShowAddBid}/>}
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
