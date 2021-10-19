import React from 'react'
import bidtrackContext from '../../../context/trades/bidtrackContext'
import { useContext } from 'react'

function NavSelectTradeBtn(props) {

    const bidContext = useContext(bidtrackContext)

    return (
        <button className='btn' style={{backgroundColor: props.color}} onClick={props.toggle}>{props.title}</button>
    )
}

export default NavSelectTradeBtn
