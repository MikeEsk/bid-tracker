import {
    AUTHORIZE_USER,
    LOGIN_USER,
    LOGOUT_USER,
    GET_BIDS,
    GET_TRADES,
    TRADE_LEVEL,
    ADD_LEVEL_ITEM,
    SELECTED_BID,
    ADD_BID,
    DELETE_BID,
    DELETE_ITEM,
    TOGGLE_REVIEWED,
    LOAD_TRADE_DATA,
    SET_LOWEST_BIDS,
    CLEAR_BIDS,
    TOGGLE_ADD_TRADE,
    TOGGLE_REMOVE_TRADE,
    ADD_TRADE,
    RESET_SELECTED_TRADE
} from '../types';


const bidtrackReducer = (state, action) => {
    switch (action.type) {
        
        case AUTHORIZE_USER:
            return {
                ...state,
                authStatus: true
            };
        
        case LOGIN_USER:
            return {
                ...state,
                user_name: action.payload.user_name,
                user_id: action.payload.user_id
            };
        
        case LOGOUT_USER:
            return {
                authStatus: false,
                user_name: '',
                user_id: '',
                showAddBid: false,
                trades: [],
                tradebids: [],
                allbids: [],
                lowestbids: {},
                bidlevelitems: [],
                selectedbid: '',
                selectedtrade: 'default',
                showAddTrade: false,
                showRemoveTrade: false
            };
        
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

        case TRADE_LEVEL:
            return {
                ...state,
                bidlevelitems: action.payload
            };

        case ADD_LEVEL_ITEM:
            return {
                ...state,
                bidlevelitems: [...state.bidlevelitems, action.payload]
            }

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

        case DELETE_ITEM:
            const itemindex = state.bidlevelitems.findIndex(item => item.item === action.payload)
            const new_items = [...state.bidlevelitems]
            new_items.splice(itemindex, 1)
            return {
                ...state,
                bidlevelitems: new_items
            }
        
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

        case SET_LOWEST_BIDS:
            return {
                ...state,
                lowestbids: action.payload
            }

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