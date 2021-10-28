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
            await bidContext.getLowestBids()
        }
        getAllBids()

    }, [])

    const getTotal = () => {
        var total =  0;
        const prices = bidContext.lowestbids;
        Object.values(prices).forEach(val => {
            (val === null ? total += 0: total += parseInt(val, 10))
        })
        return total
    }

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });

    const grandtotal = getTotal()
    
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
                        <React.Fragment key={tradeName.trade_id}>
                            <tr style={{borderBottom:'solid 1px'}}>
                                <td>{tradeName.trade}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td style={{textAlign:'center'}}>{formatter.format(bidContext.lowestbids[tradeName.trade])}</td>
                            </tr>

                            {bidContext.allbids.map((bid) => (
                                <React.Fragment key={bid.bid_id}>
                                    {bid.trade===tradeName.trade && <BidSum bid={bid}/>}
                                </React.Fragment>
                            ))}
                        </React.Fragment>)    
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td>Project Total</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td style={{textAlign:'center'}}>{formatter.format(grandtotal)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default BidTrackBidSum
