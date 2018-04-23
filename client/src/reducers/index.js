export default function (state = {}, action) {
    switch (action.type) {
        case 'SET_CARDS':
            return {...state, cards: action.payload, showDesc: false}
        case 'SHOW_DESCRIPTION':
            return {
                ...state, showDesc: action.payload
            }
        case 'ADD_TO_ACCEPTED':
            return {
                ...state, 
                 accepted: state.accepted ? [...state.accepted, action.payload] : [action.payload]
            }
        case 'ADD_TO_REJECTED':
            return {
                ...state, 
                 rejected: state.rejected ? [...state.rejected, action.payload] : [action.payload]
            }
        default:
            return state;
    }
}