import React, { useReducer } from 'react';
import bidtrackContext from './bidtrackContext';
import bidtrackReducer from './bidtrackReducer';

import {
    LOGIN_USER,
    GET_BIDS,
    GET_TRADES,
    SELECTED_BID,
    ADD_BID,
    DELETE_BID,
    TOGGLE_REVIEWED,
    LOAD_TRADE_DATA,
    SET_LOWEST_BIDS,
    CLEAR_BIDS,
    TOGGLE_ADD_TRADE,
    TOGGLE_REMOVE_TRADE,
    RESET_SELECTED_TRADE
} from '../types';

const BidTrackState = props => {
    const initialState = {
        user_name: '',
        user_id: '',
        showAddBid: false,
        trades: [],
        tradebids: [],
        allbids: [],
        lowestbids: {},
        selectedbid: '',
        selectedtrade: 'default',
        showAddTrade: false,
        showRemoveTrade: false
    }

    const [state, dispatch] = useReducer(bidtrackReducer, initialState)

    const url = 'http://localhost:5000'

    /////REMOVE TEST
    localStorage.bid_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZjEyOTZhNjktMTI5ZC00MDUyLWJkNmYtYTNjYmZkZWFjZmJjIn0sImlhdCI6MTYzNTE3NTE1MywiZXhwIjoxNjM1MTc4NzUzfQ.PePiDPzGD0hnhWaiP5m3iX40OflFqEKbDwRk3q9otEA'


    // Login the User
    const loginUser = async (user_email, user_password) => {
        const res = await fetch(`${url}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: {
                'email': user_email,
                'password': user_password
            }
        })
        const data = await res.json()
        console.log(data)

        dispatch({type: LOGIN_USER, payload: data})

    }
    
    
    // Get Bids
    const fetchBids = async () => {
        const res = await fetch(`${url}/user/bids`, {
            method: 'GET',
            headers: {
                bidtrack_jwttoken: localStorage.bid_token
            }
        })
        const data = await res.json()
        
        dispatch({type: GET_BIDS, payload: data})

    }
    
    // Get Trades
    const fetchTrades = async () => {
        const res = await fetch(`${url}/user/trades`, {
            method: 'GET',
            headers: {
                bidtrack_jwttoken: localStorage.bid_token
            }
        })
        const data = await res.json()
        
        dispatch({type: GET_TRADES, payload: data})


    }

    // Get Bid
    const fetchBid = async (id) => {
        const res = await fetch(`${url}/user/${id}`, {
            method: 'GET',
            headers: {
                bidtrack_jwttoken: localStorage.bid_token
            }
        })
        const data = await res.json()
        console.log(data)
        
        //dispatch({type: SELECTED_BID, payload: data})

        return data
    }

    // Add Bid
    const addBid = async (bid) => {
        //Is passed company, price, and reviewed from 'bid'
        
        const response = await fetch(`${url}/user/bids/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                bidtrack_jwttoken: localStorage.bid_token
            },
            body: JSON.stringify(bid)
        })
        const data = await response.json()
    
        dispatch({type: ADD_BID, payload: data})

    }

    // Delete Bid
    const deleteBid = async (id) => {
        await fetch(`${url}/user/bids/${id}`, {
        method: 'DELETE',
        headers: {
            bidtrack_jwttoken: localStorage.bid_token
            }
        })
        dispatch({type: DELETE_BID, payload: id})

    }

    // Toggle Reviewed when bid is double clicked
    const toggleReviewed = async (id) => {
        const response = await fetch(`${url}/user/bids/${id}`, {
            method: 'PUT',
            headers: {
                bidtrack_jwttoken: localStorage.bid_token
            },
        })
        const data = await response.json()
        dispatch({type: TOGGLE_REVIEWED, payload: {id, data}})

    }

    // Load trades to BidTrackerContent from BidTrackerNav selection
    const loadTrade = async (trade) => {
        clearBids()
        const res = await fetch(`${url}/user/trades/${trade}`, {
            method: 'GET',
            headers: {
                bidtrack_jwttoken: localStorage.bid_token
            }
        })
        const data = await res.json()
        dispatch({type: LOAD_TRADE_DATA, payload: {selectedtrade: trade, tradedata: data}})

        //**TODO If selectedtrade is default, have a screen that says please select a trade */
    }


    // Get the lowest bid for a specific trade
    const getLowestBids = async () => {    
        const res = await fetch(`${url}/user/lowestbids`, {
            method: 'GET',
            headers: {
                bidtrack_jwttoken: localStorage.bid_token
            }
        })
        const data = await res.json()
        dispatch({type: SET_LOWEST_BIDS, payload: data})
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
        await fetch(`${url}/user/addtrade/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                bidtrack_jwttoken: localStorage.bid_token
            },
            body: JSON.stringify(tradedata)
        })
        
        //Update the state with the new trade
        fetchTrades()
        
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
        await fetch(`${url}/user/removetrade/${tradeName}`, {
            method: 'DELETE',
            headers: {
                bidtrack_jwttoken: localStorage.bid_token
            }
        })

        //Update the state with the new trade state
        fetchTrades()

        // Update the selectrade to default
        dispatch({type: RESET_SELECTED_TRADE, payload: 'default'})

        //Call the toggleRemoveTrade function to toggle off the form
        toggleRemoveTrade()

    }

    // Show Add Bid


    
    return (
        <bidtrackContext.Provider 
            value={{
                user_name: state.user_name,
                user_id: state.user_id,
                trades: state.trades,
                tradebids: state.tradebids,
                allbids: state.allbids,
                lowestbids: state.lowestbids,
                selectedbid: state.selectedbid,
                selectedtrade: state.selectedtrade,
                showAddTrade: state.showAddTrade,
                showRemoveTrade: state.showRemoveTrade,
                loginUser,
                fetchBids,
                fetchTrades,
                fetchBid, 
                addBid, 
                deleteBid, 
                toggleReviewed,
                loadTrade,
                addTrade,
                toggleAddTrade,
                removeTrade,
                toggleRemoveTrade,
                getLowestBids
        }}>
            {props.children}
        </bidtrackContext.Provider>
    );

}

export default BidTrackState

