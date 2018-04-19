export default function (state = {}, action) {
    switch (action.type) {
        case 'SET_CARDS':
            return {
                ...state, cards: action.payload, showDesc: action.showDesc
            }
        case 'GET_ACTUAL_CARD':
            return {
                ...state, actualCard: action.payload
            }
        case 'SHOW-DESCRIPTION':
            return {
                ...state, showDesc: action.payload
            }
        default:
            return state;
    }
}