import React from 'react'

function BidSum({bid}) {
    return (
            <tr>
                <td></td>
                <td>{bid.company}</td>
                <td style={{textAlign:'center'}}>${bid.price}</td>
                <td style={{textAlign:'center'}}>{bid.reviewed ? 'Yes':'No'}</td>
                <td></td>
            </tr>
    )
}

export default BidSum
