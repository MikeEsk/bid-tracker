import React, { useReducer } from 'react';
import axios from 'axios';
import bidtrackContext from './bidtrackContext';
import bidtrackReducer from './bidtrackReducer';
import {
    SEARCH_COMPANIES,
    GET_BIDS,
    SELECTED_BID,
    ADD_BID,
    DELETE_BID,
    TOGGLE_REVIEWED,
    SET_BIDS,
    SHOW_ADD_BID
} from '../types';

const BidTrackState = props => {
    const initialState = {
        showAddBid: false,
        bids: [],
        selectedbid: {}
    }

    const [state, dispatch] = useReducer(bidtrackReducer, initialState);

    // Search Companies

    // Get Bids
    const fetchBids = async () => {
        const res = await fetch('http://localhost:5000/bids')
        const data = await res.json()
        
        dispatch({type: GET_BIDS, payload: data})
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
        const response = await fetch('http://localhost:5000/bids/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(bid)
        })
        const data = await response.json()
        
        dispatch({type: ADD_BID, payload: data})

        fetchBids()
    }

    // Delete Bid
    const deleteBid = async (id) => {
        await fetch(`http://localhost:5000/bids/${id}`, {
        method: 'DELETE',
        })

        dispatch({type: DELETE_BID, payload: id})
    }

    // Toggle Reviewed
    const toggleReviewed = async (id) => {
        
        const bidToToggle = await fetchBid(id)
        const bid_updated = {...bidToToggle, reviewed: !bidToToggle.reviewed} 
        
        const response = await fetch(`http://localhost:5000/bids/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(bid_updated)
        })

        const data = await response.json()

        dispatch({type: TOGGLE_REVIEWED, payload: id})
    }

    // Set Bids

    // Show Add Bid


    
    return (
        <bidtrackContext.Provider 
            value={{
                bids: state.bids,
                selectedbid: state.selectedbid,
                fetchBids, 
                fetchBid, 
                addBid, 
                deleteBid, 
                toggleReviewed
        }}>
            {props.children}
        </bidtrackContext.Provider>
    );

}

export default BidTrackState

