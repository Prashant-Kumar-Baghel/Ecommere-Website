//action creators
export const addItemHandler=(item)=>{
    return (dispatch)=>{
        dispatch({
            type:"ADD_ITEM",
            payload:{//In ADD_ITEM i have to return whole item.
                item:item
            }
        })
    }
}

export const RemoveItemHandler=(id)=>{
    return (dispatch)=>{
        dispatch({
            type:"REMOVE_ITEM",
            payload:{//In REMOVE_ITEM i have to return id.
                id:id
            }
        })
    }
}
export const ClearItemHandler=()=>{
    return (dispatch)=>{
        dispatch({
            type:"CLEAR_ITEM",
        })
    }
}