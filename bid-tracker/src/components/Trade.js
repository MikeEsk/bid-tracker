import React from "react";
import Header from "./Header";
import AddBid from "./AddBid";
import Bids from "./Bids";
import {BrowserRouter as Router,Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import About from "./About";
import Footer from "./Footer";

const Trade = (props) => {

    return (
        <div>
            <Header toggleShowAddBid={() => { props.setShowAddBid(!props.showAddBid); } } showAddBid={props.showAddBid} title={props.trade} />
            <Route path='/' exact render={() => (
                <React.Fragment>
                    {props.showAddBid && <AddBid onAdd={props.addBid} />}
                    {props.bids.length > 0 ? <Bids bids={props.bids} onDelete={props.deleteBid} onToggle={props.toggleReviewed} /> : 'There are no bids'}
                </React.Fragment>
            )} />
            <Route path='/about' component={About} />
            <Footer />
        </div>
    )

};

export default Trade;