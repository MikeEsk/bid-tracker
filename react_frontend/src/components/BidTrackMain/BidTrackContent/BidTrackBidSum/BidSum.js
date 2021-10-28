import React from 'react'

function BidSum({bid}) {
    
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });

    return (
            <tr>
                <td></td>
                <td>{bid.company}</td>
                <td style={{textAlign:'center'}}>{formatter.format(bid.price)}</td>
                <td style={{textAlign:'center'}}>{bid.reviewed ? 'Yes':'No'}</td>
                <td></td>
            </tr>
    )
}

export default BidSum
