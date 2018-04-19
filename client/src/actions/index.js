export function setCards() {
    return {
        type: 'SET_CARDS',
        payload: [{
                    title:"Dog in the Garden",
                    rating:6.8,
                    picture: "dogo"
                },
                {
                    title:"Dragon Ball Z",
                    rating:9.8,
                    picture: "dragon"
                }],
        showDesc: false
    }
}

export function getActualCard(card) {
    return {
        type: 'GET_ACTUAL_CARD',
        payload: card[0]
                
    }
}

export function showDescription(showDesc){
    return{
        type: 'SHOW-DESCRIPTION',
        payload: !showDesc
    }
}