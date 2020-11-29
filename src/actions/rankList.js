export const updateNewList = (newList) =>{
    return {
        type: 'UPDATE_NEW_LIST',
        payload: newList,
    }
}

export const updateNewListPositions = (newList) =>{
    return {
        type: 'UPDATE_NEW_LIST_POSITIONS',
        payload: newList,
    }
}