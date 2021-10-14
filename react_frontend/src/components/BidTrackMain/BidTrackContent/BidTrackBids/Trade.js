import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import bidtrackContext from "../../../../context/trades/bidtrackContext";
import Header from "./Header";
import AddBid from "./AddBid";
import Bids from "./Bids";
import Footer from "./Footer";

const Trade = () => {

    const bidcontext = useContext(bidtrackContext);
    const [showAddBid, setShowAddBid] = useState(false);

    return (
        <div>
            <React.Fragment>
                    <Header toggleShowAddBid={() => { setShowAddBid(!showAddBid); } } showAddBid={showAddBid} title='Concrete' /> 
                    {showAddBid && <AddBid onAdd={bidcontext.addBid} />}
                    {bidcontext.bids.length > 0 ? <Bids bids={bidcontext.bids} onDelete={bidcontext.deleteBid} onToggle={bidcontext.toggleReviewed} /> : 'There are no bids'}
                    <Footer />
            </React.Fragment>
        </div>
    )

};

export default Trade;