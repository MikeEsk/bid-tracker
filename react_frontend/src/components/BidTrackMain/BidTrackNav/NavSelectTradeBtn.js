import React from 'react'

function NavSelectTradeBtn(props) {

    return (
        <button className='btn btn-trade' style={{backgroundColor: props.color}} onClick={props.toggle}>{props.title}</button>
    )
}

export default NavSelectTradeBtn
