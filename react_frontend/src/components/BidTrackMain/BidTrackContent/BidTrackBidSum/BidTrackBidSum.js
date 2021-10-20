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
            total += parseInt(val)
        })

        return total
    }

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
                        <React.Fragment>
                            <tr style={{borderBottom:'solid 1px'}}>
                                <td>{tradeName.trade}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td style={{textAlign:'center'}}>${bidContext.lowestbids[tradeName.trade]}</td>
                            </tr>

                            {bidContext.allbids.map((bid) => (
                                <React.Fragment>
                                    {bid.trade===tradeName.trade && <BidSum bid={bid}/>}
                                </React.Fragment>
                            ))}
                        </React.Fragment>)    
                    )}
                </tbody>
                <tfoot>
                    <td>Project Total</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{textAlign:'center'}}>${grandtotal}</td>
                </tfoot>
            </table>
        </div>
    )
}

export default BidTrackBidSum
