import React, { useState } from 'react'
import AddToCartIcon from "../../../assests/icons/add_cart.svg";
import Modal from '../../UI/Modal';
import { useDispatch, useSelector } from 'react-redux';
import {addItemHandler,RemoveItemHandler} from '../../../action'
// const ListItem = ({data, updateItemTitle, onAdd ,onRemove}) => {//if we want to expand props we can use {data} inplace of props.here data work as object because props is also object .
const ListItem = ({data, updateItemTitle}) => {//As we are using central store hence we erase onAdd and onRemove.
//    console.log(props);
// const [counter,setCounter]=useState(0);//comment this because we are using data.quantity
const [showModal,setShowModal]=useState(false); //create this state variable to decide Modal will be show or not. 

const item=useSelector(state=>state.items.find(item=>item.id===data.id))  //Now In state we want to find the item  we are getting in ListItem because we want to get that item from central storage.

const dispatch=useDispatch()

const decreaseCounterByOne=(event)=>{
    event.stopPropagation();//Through stopPropagation() function we donot get Modal when we click on addtocart button on screen.
    // onRemove(data.id);//don't use this when we are using central store

    // if(counter==0){
    //     return;
    // }
    // if(counter==1){//when counter become one and we have to call decreaseCounterByOne function it mean we have to remove that item from cart hence we are calling onRemove() function.
    //     onRemove(data.id);
    // }
    // setCounter(counter-1);

    // dispatch({//dispatching for removing items to cart.(using central store)
    //     type:"REMOVE_ITEM",
    //     payload:{
    //         id:data.id//as we expecting only id in REMOVE_ITEM in central store.
    //     }
    // })

    //dispatching for removing items to cart.(using middleware)
    dispatch(RemoveItemHandler(data.id))

}
const increaseCounterByOne=(event)=>{
    event.stopPropagation();//Through stopPropagation() function we donot get Modal when we click on addtocart button on screen.
    //  onAdd(data.id);//As we are calling this onAdd function every time whenever we adding element to cart 
    // setCounter(counter+1);

    // dispatch({//dispatching for adding items to cart.
    //     type:"ADD_ITEM",
    //     payload:{
    //         item:data//as we expecting item in ADD_ITEM in central store.
    //     }
    // })

    //dispatching for adding items to cart.(using middleware)
    dispatch(addItemHandler(data))

}
const handleModal=()=>{//create this Function to decide Modal will be show or not.  
    setShowModal((previousState)=>{
        return !previousState;
    });//we create arrow function inside the setShowModal() because we can reuse handleModal function.we can also write this arrow function as previousState=>!previousState.
}
  return (<>
     {/* when we click on listitem then we want to show our modal to user hence called handleModal function on click the item. */}
    <div onClick={handleModal} className={"item-card"}>
        <img className={"img-fluid"} src={`/assest/${data.thumbnail}`} alt={data.title}/>
        <div className={"item-card__information"}>
            <div className={"pricing"}>
                <span>{data.discountedPrice}</span>
                {/* small tag is used to make size of text smaller */}
                <small>
                {/* strike tag is used to put line over text. */}
                    <strike>{data.price}</strike>
                </small>
            </div>
            <div className={"tittle"}>
                <h3>{data.title}</h3>
            </div>
            <div>
                
                <button onClick={()=>updateItemTitle(data.id)}>Update the title</button>
                {
                // counter<1?Instead if counter we write data.quantity
                // data.quantity<1?
                !item || item?.quantity<1?//using central store(if item is not present it mean we can't read the quantity of undefined hence we write !item(it mean iteam is not present) ).
                <button className={"cart-add"} onClick={increaseCounterByOne}>
                    <span>Add to Cart </span> 
                    <img src={AddToCartIcon} alt="" />
                </button>
                :
                <div className={"cart-addon"}>
                    <button onClick={decreaseCounterByOne}><span>-</span></button>
                     <span>{item.quantity}</span>
                    <button onClick={increaseCounterByOne}><span>+</span></button>
                </div>
                }
            </div>
        </div>
    </div>
    {/* the content between Modal opening and closing tag passed to Modal as children props. */}
        {showModal && 
      <Modal onClose={handleModal}> 
            <div className="item-card__modal">
                <div className="img-wrap">
                <img className={"img-fluid"} src={`/assest/${data.thumbnail}`} alt={data.title}/>
                </div>
                <div className="meta">
                    <h3>{data.title}</h3>
                    <div className={"pricing"}>
                    <span>{data.discountedPrice}</span>
                    <small>
                        <strike>{data.price}</strike>
                    </small>
                    </div>
                    <p>{data.description}</p>

                    {/* Adding Add to cart button in Modal */}
                    {   
                    // counter<1?Instead of counter we write data.quantity
                    // data.quantity<1?
                    !item || item?.quantity<1?
                   <button className={"cart-add card-add__modal"} onClick={increaseCounterByOne}>
                       <span>Add to Cart </span> 
                       <img src={AddToCartIcon} alt="" />
                   </button>
                :
                  <div className={"cart-addon card-addon__modal"}>
                    <button onClick={decreaseCounterByOne}><span>-</span></button>
                     <span>{item.quantity}</span>
                    <button onClick={increaseCounterByOne}><span>+</span></button>
                  </div>
                }
                </div>
            </div>
      </Modal>}
    </>
  )
}

export default ListItem