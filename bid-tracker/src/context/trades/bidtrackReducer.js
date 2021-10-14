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


const bidtrackReducer = (state, action) => {
    switch (action.type) {
        case SEARCH_COMPANIES:
            return {  
                //TODO
            };

        case GET_BIDS:
            
            return {
                ...state,
                bids: action.payload
            };

        case SELECTED_BID:

            return {
                ...state,
                selectedbid: action.payload
            };
            
        
        case ADD_BID:
            console.log(action.payload)

            return {
                ...state,
                bids: [...state.bids, action.payload]
            };
        
        
        case DELETE_BID:
            
            const index = state.bids.findIndex(bid => bid.bid_id === action.payload)
            const new_bids = [...state.bids]
            new_bids.splice(index, 1)
        
            return {
                ...state,
                bids: new_bids
            };
        
        case TOGGLE_REVIEWED:

            //Check that review status matches state
            //state.bids.bid_id

            const bids_toggled = state.bids.map(bid => bid.bid_id === action.payload.id ? {...bid, reviewed: !bid.reviewed}: bid)

            return {
                ...state,
                bids: bids_toggled
            };

        case SET_BIDS:
            return {
                //TODO
            };

        case SHOW_ADD_BID:
            return {
                //TODO
            };
        default:
            return {

            };
    }
}

export default bidtrackReducer