import React from "react";
import { useContext } from "react";
import { useState } from "react";
import bidtrackContext from "../../../../context/trades/bidtrackContext";
import TradeTitle from "./TradeTitle";
import AddBid from "./AddBid";
import Bids from "./Bids";

const Trade = () => {

    const bidcontext = useContext(bidtrackContext);
    const [showAddBid, setShowAddBid] = useState(false);

    return (
        <div>
            <React.Fragment>
                <TradeTitle toggleShowAddBid={() => { setShowAddBid(!showAddBid); } } showAddBid={showAddBid} title={bidcontext.selectedtrade} /> 
                {showAddBid && <AddBid onAdd={bidcontext.addBid} trade={bidcontext.selectedtrade}/>}
                {bidcontext.tradebids.length > 0 ? <Bids bids={bidcontext.tradebids} onDelete={bidcontext.deleteBid} onToggle={bidcontext.toggleReviewed} /> : bidcontext.selectedtrade !== 'default' && 'There are no bids'}
                <br></br>
                {bidcontext.tradebids.length > 0 && <h4>Double click on bid to confirm reviewed</h4>}
            </React.Fragment>
        </div>
    )

};

export default Trade;