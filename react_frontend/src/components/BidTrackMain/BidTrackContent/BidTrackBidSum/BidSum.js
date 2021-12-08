import React from 'react'

function BidSum({ bid, items }) {
    
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });

    const bidSum = (bid) => {
        //Get total price adding up base bid and items
        let totalprice = parseInt(bid.price)
        items.filter(item => (item.bid_id === bid.bid_id)).forEach(item => totalprice += parseInt(item.price))
        return formatter.format(totalprice)
    }

    const itemSum = (bid) => {
        //Get total price adding up base bid and items
        let itemprices = 0
        items.filter(item => (item.bid_id === bid.bid_id)).forEach(item => itemprices += parseInt(item.price))
        return formatter.format(itemprices)
    }

    return (
            <tr>
                <td></td>
                <td>{bid.company}</td>
                <td style={{textAlign:'center'}}>{formatter.format(bid.price)}</td>
                <td>{itemSum(bid)}</td>
                <td>{bidSum(bid)}</td>
                <td style={{textAlign:'center'}}>{bid.reviewed ? 'Yes':'No'}</td>
                <td></td>
            </tr>
    )
}

export default BidSum
