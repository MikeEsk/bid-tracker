import React from 'react'
import { Route } from 'react-router'
import NavSelectTradeBtn from './NavSelectTradeBtn'
import { useContext } from 'react'
import bidtrackContext from '../../../context/trades/bidtrackContext'

function NavSelectItems() {

    const bidContext = useContext(bidtrackContext)

    return (
        <React.Fragment>
            <Route path='/bids' exact render={() => (
                <React.Fragment>
                    {bidContext.trades.length === 0 && <span>No Trades</span>}
                    <ul className='navselectitems'>
                        {bidContext.trades.map(trade =>
                            <li onClick={(e) => bidContext.loadTrade(e.target.textContent)} key={trade.trade_id} value={trade.trade} className='navselectitem'>{trade.trade}</li>
                        )}
                    </ul>
                    <div className='navselect-tradebtns'>
                        <NavSelectTradeBtn title='Add Trade' color='green' toggle={bidContext.toggleAddTrade}/>
                        <NavSelectTradeBtn title='Remove Trade' color='red' toggle={bidContext.toggleRemoveTrade}/>
                    </div>
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
                    <div style={{padding: '15px', textAlign:'center', color: 'blue', fontWeight:'bold'}}>
                        <a target="rel-noopener" href="https://linkedin.com/in/michael-eskridge-b83bb7150">LinkedIn Profile</a>
                        <br></br>
                        <br></br>
                        <a target="rel-noopener" href="mailto: mte0001@gmail.com">Contact</a>

                        
                    </div>
                )}
            />
        </React.Fragment>

    )
}

export default NavSelectItems
