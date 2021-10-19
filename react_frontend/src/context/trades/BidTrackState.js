import React, { useReducer } from 'react';
import axios from 'axios';
import bidtrackContext from './bidtrackContext';
import bidtrackReducer from './bidtrackReducer';

import {
    SEARCH_COMPANIES,
    GET_BIDS,
    GET_TRADES,
    SELECTED_BID,
    ADD_BID,
    DELETE_BID,
    TOGGLE_REVIEWED,
    LOAD_TRADE_DATA,
    CLEAR_BIDS,
    TOGGLE_ADD_TRADE,
    TOGGLE_REMOVE_TRADE,
    RESET_SELECTED_TRADE
} from '../types';

const BidTrackState = props => {
    const initialState = {
        showAddBid: false,
        trades: [],
        bids: [],
        selectedbid: {},
        selectedtrade: 'default',
        showAddTrade: false,
        showRemoveTrade: false
    }

    const [state, dispatch] = useReducer(bidtrackReducer, initialState);

    // Search Companies

    // Get Trades
    const fetchBids = async () => {
        const res = await fetch('http://localhost:5000/bids')
        const data = await res.json()
        
        //dispatch({type: GET_BIDS, payload: data.bids})
        
        dispatch({type: GET_TRADES, payload: data.trades})


    }

    // Get Bid
    const fetchBid = async (id) => {
        const res = await fetch(`http://localhost:5000/bids/${id}`)
        const data = await res.json()
        
        //dispatch({type: SELECTED_BID, payload: data})

        return data
    }

    // Add Bid
    const addBid = async (bid) => {
        //Is passed company, price, and reviewed from 'bid'
        
        const response = await fetch('http://localhost:5000/bids/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(bid)
        })
        const data = await response.json()
    
        dispatch({type: ADD_BID, payload: data})

    }

    // Delete Bid
    const deleteBid = async (id) => {
        const res = await fetch(`http://localhost:5000/bids/${id}`, {
        method: 'DELETE',
        })
        dispatch({type: DELETE_BID, payload: id})

    }

    // Toggle Reviewed when bid is double clicked
    const toggleReviewed = async (id) => {
        const response = await fetch(`http://localhost:5000/bids/${id}`, {
            method: 'PUT',
        })
        const data = await response.json()
        dispatch({type: TOGGLE_REVIEWED, payload: {id, data}})

    }

    // Load trades to BidTrackerContent from BidTrackerNav selection
    const loadTrade = async (trade) => {
        clearBids()
        const res = await fetch(`http://localhost:5000/trades/${trade}`)
        const data = await res.json()
        dispatch({type: LOAD_TRADE_DATA, payload: {selectedtrade: trade, tradedata: data}})

        //**TODO If selectedtrade is default, have a screen that says please select a trade */
    }


    // Clear all bids
    const clearBids = () => {
        const clearedBids = []
        dispatch({type: CLEAR_BIDS, payload: clearedBids})
    }

    
    // Toggle the addTrade form
    const toggleAddTrade = () => {
        dispatch({type: TOGGLE_ADD_TRADE})
    }
    
    
    // Add the trade to the database and toggle the toggleAddTrade off
    const addTrade = async (tradeName) => {
        
        const tradedata = {trade: tradeName}
        console.log(tradedata)
        const res = await fetch('http://localhost:5000/addtrade/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(tradedata)
        })
        
        //Update the state with the new trade
        fetchBids()
        
        // Call the loadTrade function to load the new trade into the title and show its state of bids
        loadTrade(tradeName)
        
        //Call the toggleAddTrade function to toggle off the form
        toggleAddTrade()
    }

    
    // Toggle the removeTrade form
    const toggleRemoveTrade = () => {
        dispatch({type: TOGGLE_REMOVE_TRADE})
    }


    // Remove a trade from the database and toggle the toggleRemoveTrade off
    const removeTrade = async (tradeName) => {
        const res = await fetch(`http://localhost:5000/removetrade/${tradeName}`, {
        method: 'DELETE',
        })

        //Update the state with the new trade state
        fetchBids()

        // Update the selectrade to default
        dispatch({type: RESET_SELECTED_TRADE, payload: 'default'})

        //Call the toggleRemoveTrade function to toggle off the form
        toggleRemoveTrade()

    }

    // Show Add Bid


    
    return (
        <bidtrackContext.Provider 
            value={{
                trades: state.trades,
                bids: state.bids,
                selectedbid: state.selectedbid,
                selectedtrade: state.selectedtrade,
                showAddTrade: state.showAddTrade,
                showRemoveTrade: state.showRemoveTrade,
                fetchBids, 
                fetchBid, 
                addBid, 
                deleteBid, 
                toggleReviewed,
                loadTrade,
                addTrade,
                toggleAddTrade,
                removeTrade,
                toggleRemoveTrade
        }}>
            {props.children}
        </bidtrackContext.Provider>
    );

}

export default BidTrackState

