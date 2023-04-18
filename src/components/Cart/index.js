import React from 'react'
import Modal from '../UI/Modal'
import { useState } from 'react';
import CartItem from './CartItem';
import OrderSuccessModal from '../UI/OrderSuccessModal';
import { useDispatch, useSelector } from 'react-redux';
import {addItemHandler,RemoveItemHandler,ClearItemHandler} from '../../action'

// const Cart = ({count,items,onHandleEvent}) => {
const Cart = () => {//create this because we are using central store.
  const [showModal, setShowModal] = useState(false);
  const[orderModal,setOrderModal]= useState(false);//this state variable for handling that order is successfully placed or not.

  const items=useSelector(state=>state.items)//using central store
  const totalAmount=useSelector(state=>state.totalAmount)//previously we are calculating totalAmount using reduce function that is not using central store.but now we use cental store to rendor totalAmount.
  const handleCartbutton=()=>{
    return(
        
        setShowModal(previousState =>!previousState)
        
    )
  }
  const handleOrderModal=()=>{
    setShowModal(false);
    // dispatch({//writing displach function here because want to clear the cart when we click on order now button.
    //     type: "CLEAR_ITEM"
    // })
    dispatch(ClearItemHandler());//using middleware
    setOrderModal(previousState=>!previousState);
  }
  const dispatch= useDispatch();
  const dispatchEvents=(item,type)=>{
    if(type===1){
        // dispatch({
        //     type:"ADD_ITEM",
        //     payload:{
        //         item:item
        //     }
        // })
        dispatch(addItemHandler(item));//using middleware
    }else if(type===-1){
        // dispatch({
        //     type:"REMOVE_ITEM",
        //     payload:{
        //         id:item.id
        //     }
        // })

        dispatch(RemoveItemHandler(item.id))//using middleware
    }
}
  return (
    <>
    <button onClick={handleCartbutton}>
                {/* making dynamically count to increase and decrease cart button value. */}
                <span data-items={items.length}>Cart</span>
                {/* {count} is replaced by {items.length} because we we using cental store*/}
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart-plus" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="6" cy="19" r="2" />
                    <circle cx="17" cy="19" r="2" />
                    <path d="M17 17h-11v-14h-2" />
                    <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
                    <path d="M15 6h6m-3 -3v6" />
                </svg>
    </button>
    {showModal && <Modal onClose={handleCartbutton}>
        {/* Cart model is basically represent with className checkout-model and className with checkout-modal_list basically contain list of items, className with empty-cart is basically to show message when cart is the empty, className with checkout-modal_List-Item is basically contain item,className with information is contain all the informtion regarding product*/}
        <div className="checkout-modal">
            <h2>Checkout Modal</h2>
            <div className="checkout-modal_list">
                {
                    // count>0?
                    items.length>0?
            //         <div className="checkout-modal_List-item">
            //         <div className="img-wrap">
            //            <img src={"/assest/placeholder.png"} className="img-fluid" alt="Placeholder" />
            //         </div>
            //         <div className="information">
            //            <div>
            //                <h4>Title of the Product</h4>
            //                <div className="pricing">
            //                    <span>2000</span>
            //                    <small>
            //                        <strike> 2500</strike>
            //                    </small>
            //                </div>
            //            </div>
            //            <div className="cart-addon cart-addon__modal">
            //                <button>-</button>
            //                <span className="counter">{0}</span>
            //                <button>+</button>
            //            </div>
            //         </div>
            //    </div>
            items.map(item=>{//All cartItems will be rendored.
                return <CartItem data={item}
                 key={item.id}
                //  onEmitDecreaseItem={(id)=>onHandleEvent(id,-1)}
                //  onEmitIncreaseItem={(id)=>onHandleEvent(id,1)}
                 onEmitDecreaseItem={(item)=>dispatchEvents(item,-1)}
                 onEmitIncreaseItem={(item)=>dispatchEvents(item,1)}/>;
            })
               :
               <div className="empty-cart">Please add something in your cart.</div>
                }

            </div>

            {
                // count>0 &&
                items.length>0 &&
                <div className="checkout-modal_footer">
                    <div className="totalAmount">
                        <h4>total Amount</h4>
                        <h4>
                            {//Here we are using reduce functon to calculate amount and The final result of running the reducer across all elements of the array is a single value.Link to study about reduce function:-https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
                                // items.reduce((previous,current)=>{
                                //     return previous+(current.discountedPrice* current.quantity)
                                // },0)

                                totalAmount//calculating totalAmount using central store.
                            } 
                            {/* To learn about inline css in jsx click on this link:-https://www.w3schools.com/react/react_css.asp */}
                            <span style={{marginLeft: "4px"}}>INR</span>
                        </h4>
                    </div>
                    <button onClick={handleOrderModal}>Order Now</button>
                </div>
            }
        </div>
    </Modal>}

    {/* if orderModal is true it mean button is clicked hence OrderModal will be true and OrderSuccessModal will be call. */}
    {orderModal && <OrderSuccessModal onClose={handleOrderModal}/>}
    </>
  )
}

export default Cart