import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import bidtrackContext from "../../../../context/trades/bidtrackContext";
import TradeTitle from "./TradeTitle";
import AddBid from "./AddBid";
import Bids from "./Bids";
import Footer from "../Footer";

const Trade = () => {

    const bidcontext = useContext(bidtrackContext);
    const [showAddBid, setShowAddBid] = useState(false);

    return (
        <div>
            <React.Fragment>
                    <TradeTitle toggleShowAddBid={() => { setShowAddBid(!showAddBid); } } showAddBid={showAddBid} title={bidcontext.selectedtrade} /> 
                    {showAddBid && <AddBid onAdd={bidcontext.addBid} />}
                    {bidcontext.bids.length > 0 ? <Bids bids={bidcontext.bids} onDelete={bidcontext.deleteBid} onToggle={bidcontext.toggleReviewed} /> : bidcontext.selectedtrade !== 'default' && 'There are no bids'}
            </React.Fragment>
        </div>
    )

};

export default Trade;