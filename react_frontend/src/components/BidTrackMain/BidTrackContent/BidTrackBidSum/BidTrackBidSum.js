import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import bidtrackContext from '../../../../context/trades/bidtrackContext';
import BidSum from './BidSum';


function BidTrackBidSum() {
    const bidContext = useContext(bidtrackContext);
    useEffect(() => {
        const getAllBids = async () => {
            await bidContext.fetchTrades()
            await bidContext.fetchBids()
        }
        getAllBids()
        console.log(bidContext.allbids)

    }, [])

    
    return (
        <div>
            <h1>Bid Summary</h1>

            <table className='summary-table'>
                <thead>
                    <tr>
                        <th>Trade</th>
                        <th>Company</th>
                        <th>Price</th>
                        <th>Reviewed</th>
                        <th>Lowest Bid</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {bidContext.trades.map((tradeName) => (
                        <React.Fragment>
                            <tr style={{borderBottom:'solid 1px'}}>
                                <td>{tradeName.trade}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                            {bidContext.allbids.map((bid) => (
                                <React.Fragment>
                                    {bid.trade===tradeName.trade && <BidSum bid={bid}/>}
                                </React.Fragment>
                            ))}
                        </React.Fragment>)    
                    )}
                </tbody>
            </table>
        </div>
    )
} 

export default BidTrackBidSum
