import {
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
    ADD_TRADE,
    RESET_SELECTED_TRADE
} from '../types';


const bidtrackReducer = (state, action) => {
    switch (action.type) {

        case GET_BIDS:
            return {
                ...state,
                allbids: action.payload
            };
        
        case GET_TRADES:
            return {
                ...state,
                trades: action.payload
            };

        case SELECTED_BID:
            return {
                ...state,
                selectedbid: action.payload
            };
        
        case ADD_BID:
            return {
                ...state,
                tradebids: [...state.tradebids, action.payload]
            };
        
        case DELETE_BID:
            const index = state.tradebids.findIndex(bid => bid.bid_id === action.payload)
            const new_bids = [...state.tradebids]
            new_bids.splice(index, 1)
            return {
                ...state,
                tradebids: new_bids
            };
        
        case TOGGLE_REVIEWED:
            const bids_toggled = state.tradebids.map(bid => bid.bid_id === action.payload.id ? {...bid, reviewed: !bid.reviewed}: bid)
            return {
                ...state,
                tradebids: bids_toggled
            };

        case LOAD_TRADE_DATA:
            return {
                ...state,
                selectedtrade: action.payload.selectedtrade,
                tradebids: action.payload.tradedata
            };

        case CLEAR_BIDS:
            return {
                ...state,
                tradebids: action.payload
            };

        case TOGGLE_ADD_TRADE:
            return {
                ...state,
                showAddTrade: !state.showAddTrade
            }

        case TOGGLE_REMOVE_TRADE:
            return {
                ...state,
                showRemoveTrade: !state.showRemoveTrade
            }
        
        case ADD_TRADE:
            return {
                ...state,
                trades: [...state.trades, action.payload]
            }
        
        case RESET_SELECTED_TRADE:
            return {
                ...state,
                selectedtrade: action.payload
            }

        default:
            return {

            };
    }
}

export default bidtrackReducer