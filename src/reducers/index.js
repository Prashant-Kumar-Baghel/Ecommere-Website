const mainReducer=(state,action)=>{
    switch(action.type){
        case 'ADD_ITEM':{
            let items=[...state.items]//put existing items into items variable
            let index=items.findIndex(item=>item.id===action.payload.item.id)//finding index(here payload is contain item)
    
            if(index>-1){//it mean items is present then we just increase its quantity
                 items[index]={
                    ...items[index],//copy all the existing thing
                    quantity:items[index].quantity+1 //updat quantity
                    
                 }

            }else{//it mean items doesnot present then we add item.
                  items.push({
                    ...action.payload.item,
                    quantity:1//intially quantity is zero thatswhy we update it by one.
                  })
            }
            const totalAmount=state.totalAmount+action.payload.item.discountedPrice//Now whenever item is added to cart the totalamount also updated.
            return{//finally returning state.
                ...state,
                items:items,
                totalAmount:totalAmount
            }

        }
        case 'REMOVE_ITEM':{
            let items=[...state.items]//put existing items into items variable
            let index=items.findIndex(item=>item.id===action.payload.id)//finding index(here payload is contain item and we are only getting id not complete item)
            let totalAmount=state.totalAmount-items[index].discountedPrice//we calculated totalamount before removing because if quantity of that perticular item is one then we removed that item and that item index will not present in items array then how we calculate the totalamount.(//Now whenever item is remove from cart the totalamount also updated.)

            
            //Inthis we have two cases.
            if(items[index].quantity===1){// a)if quantity of that perticular item is one then we completely remove that item 
                items.splice(index,1)
            }else{  // b)if quantity of that perticular item is greater  then one we just update the quantity of that item.
                items[index]={
                    ...items[index],
                    quantity:items[index].quantity-1
                }
            }
            return{//finally returning state.
                ...state,
                items:items,
                totalAmount: totalAmount
            }
        }
        case 'CLEAR_ITEM':{//As we clear our cart then it become empty and items array also become empty and totalAmounts set to zero. 
            return{
                items:[],//items array contain all product that we fetching from firebase database.
                totalAmount:0//total amount comes when we add items in cart.
            }
        }
        default : return state;
    }
}
export default mainReducer