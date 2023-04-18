// This component just behave like template for ListItem.
import React from 'react'
const CartItem = ({data,onEmitDecreaseItem,onEmitIncreaseItem}) => {
  return (
    
    <div className="checkout-modal_List-item">
                    <div className="img-wrap">
                       <img src={`/assest/${data.thumbnail}`} className="img-fluid" alt={data.title} />
                    </div>
                    <div className="information">
                       <div>
                           <h4>{data.title}</h4>
                           <div className="pricing">
                               <span>{data.discountedPrice}</span>
                               <small>
                                   <strike>{data.price}</strike>
                               </small>
                           </div>
                       </div>
                       <div className="cart-addon cart-addon__modal">
                       {/* we have to pass data.id to know which item quanity we will increase. */}

                           {/* <button onClick={()=>onEmitDecreaseItem(data.id)}>-</button>
                           <span className="counter">{data.quantity}</span>
                           <button onClick={()=>onEmitIncreaseItem(data.id)}>+</button> */}
                          
                         {/* Here we writing again because now we passing complete data not only id.(using cental store) */}
                          <button onClick={()=>onEmitDecreaseItem(data)}>-</button>
                           <span className="counter">{data.quantity}</span>
                           <button onClick={()=>onEmitIncreaseItem(data)}>+</button> 

                       </div>
                    </div>
    </div>
    
    
  )
}

export default CartItem