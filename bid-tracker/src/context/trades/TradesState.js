/*

import React, { useReducer } from 'react';
import axios from 'axios';
import TradesContext from './tradesContext';
import TradesReducer from './tradesReducer';
import {
    SEARCH_COMPANIES,
    GET_BIDS,
    ADD_BID,
    DELETE_BID,
    TOGGLE_REVIEWED,
    SET_BIDS,
    SHOW_ADD_BID
} from '../types';

const TradesState = props => {
    const initialState = {
        showAddBid: false,
        bids: []
    }

    const [state, dispatch] = useReducer(TradesReducer, initialState);

    // Search Companies

    // Get Bids

    // Set Bids


    
    return <TradesContext.Provider
        value={{
            showAddBid: state.showAddBid,
            bids: state.bids
        }}
    >
        {props.children}
    </TradesContext.Provider>

}

export default TradesState

*/