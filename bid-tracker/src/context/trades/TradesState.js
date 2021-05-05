import React, { useReducer } from 'react';
import axios from 'axios';
import tradesContext from './tradesContext';
import tradesReducer from './tradesReducer';
import {
    SEARCH_COMPANIES,
    GET_BIDS,
    SET_BIDS
} from '../types';

const TradesState = props => {
    const initialState = {
        showAddBid: false,
        bids: []
    }

    const [state, dispatch] = useReducer(tradesReducer, initialState);

    // Search Companies

    // Get Bids

    // Set Bids


    
    return <tradesContext.Provider
        value={{
            showAddBid: state.showAddBid,
            bids: state.bids
        }}
    >
        {props.children}
    </tradesContext.Provider>

}

export default TradesState