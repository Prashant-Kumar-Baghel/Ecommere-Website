import React from 'react'
import Products from './components/Products/Products'
import Header from './components/Layout/Header'
import Subheader from './components/Layout/Subheader'
import { useState } from 'react'
const App = () => {
  // const [cartItems,setCartItems]=useState(0);//create this state variable to increase count of items in cart(cart button).
  const [cartItems,setCartItems]=useState([])//cartItems contain all items present in cart.
  const [eventQueue,setEventQueue]=useState({ //this state variable tell wheather quanity increasing or decreasing
    id:" ",
    type:" "//type show wheather quanity increasing or decreasing
  })  
  const handleonAddItem=(item)=>{//this function to increase cart-items whenever item added to cart.
    let items=[...cartItems];//put all existing cart-item in items.we can't directly changed existing state variable.
    let index=items.findIndex(e=>e.id===item.id);
    if(index>-1){//if that item exist then we need to update it into cart.
      items[index]=item;
    }else{//if that item doesnot exist then we push that item into cart.                                            
      items.push(item);
    }    
    // setCartItems(cartItems+1)
    setCartItems([...items]);
  }

  const handleonRemoveItem=(item)=>{//this function to decrease cart-items whenever item remove from cart.
    // setCartItems(cartItems-1);
    let items=[...cartItems];
    let index=items.findIndex(e=>e.id===item.id);
    if(items[index].quantity===0){//if the item quantity is zero then we have to remove that item from cart.
      items.splice(index,1);//removing
    }else{//if that item present the we have to update that item.
      items[index]=item;
    }
    // setCartItems(cartItems+1)
    setCartItems([...items]);
  }
//type===-1,decrease
//type===1 ,increase
  const handleEventQueue=(id,type)=>{
    setEventQueue({
      id,
      type
    })
  } 
  return (
    <>
    {/* cartItems.length indicating number of items present in a cart.and sending cartItems as props to Header to rendore all items added to cart.we pass cartItems as props because we rendored all in checkout model */}
    {/* Passing handleEventQueue function to Header because cart is present in header and cartitem is present in cart so we get information about that wheather we want quantity as increase or decrease. */}
    <Header count={cartItems.length} items={cartItems} onHandleEvent={handleEventQueue}/>
    <Subheader/>
    {/* Passes eventQueue to product to update quantity */}
    <Products onAddItem={handleonAddItem} onRemoveItem={handleonRemoveItem} eventState={eventQueue}/>
    </>
  )
}

export default App
