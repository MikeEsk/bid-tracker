import React from 'react'
import { Route } from 'react-router'
import NavSelectTradeBtn from './NavSelectTradeBtn'
import { useContext } from 'react'
import bidtrackContext from '../../../context/trades/bidtrackContext'

function NavSelectItems() {

    const bidContext = useContext(bidtrackContext)

    return (
        <div style={{alignContent:'center'}}>
            <Route path='/bids' exact render={() => (
                <React.Fragment>
                    <ul className='navselectitems'>
                        {bidContext.trades.map(trade =>
                            <li onClick={(e) => bidContext.loadTrade(e.target.textContent)} key={trade.trade_id} value={trade.trade} className='navselectitem'>{trade.trade}</li>
                        )}
                    </ul>

                    <NavSelectTradeBtn title='Add Trade' color='green' toggle={bidContext.toggleAddTrade}/>
                    <NavSelectTradeBtn title='Remove Trade' color='red' toggle={bidContext.toggleRemoveTrade}/>
                </React.Fragment>)}
            />
                
            <Route path='/bidsummary' exact render={() => (
                    <div>
                        Summary of All Bids
                    </div>
                )}
            />

            <Route path='/bidleveling' exact render={() => (
                    <div>
                        Trades
                    </div>
                )}
            />
            
            <Route path='/about' exact render={() => (
                    <div>
                        Links
                    </div>
                )}
            />
        </div>

    )
}

export default NavSelectItems
