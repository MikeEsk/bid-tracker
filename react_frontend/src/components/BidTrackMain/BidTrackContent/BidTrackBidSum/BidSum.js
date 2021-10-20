import React from 'react'

function BidSum({bid}) {
    return (
            <tr>
                <td></td>
                <td>{bid.company}</td>
                <td>{bid.price}</td>
                <td>{bid.reviewed ? 'Yes':'No'}</td>
                <td></td>
            </tr>
    )
}

export default BidSum
