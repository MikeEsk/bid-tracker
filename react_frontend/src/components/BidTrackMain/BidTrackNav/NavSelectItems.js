import React from 'react'

function NavSelectItems(props) {

    return (
        <React.Fragment>
            <ul className='navselectitems'>
                {props.trades.map(trade =>
                    <li onClick={props.onClick} value={trade.trade} className='navselectitem'>{trade.trade}</li>
                )}
            </ul>
        </React.Fragment>
    )
}

export default NavSelectItems
