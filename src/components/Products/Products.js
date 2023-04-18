import React, { useState,useEffect } from 'react'
import ListItem from './ListItems/ListItem'
import axios from 'axios'
import Loader from '../UI/Loader'
// const items=[
//   {
//     id:0,
//     discountedPrice : 340,
//     price: 450,
//     title:"Title of the Item",
//     thumbnail:"placeholder.png"

//   },
//   {
//     id:1,
//     discountedPrice : 900,
//     price: 500,
//     title:"Title  the Item",
//     thumbnail:"placeholder.png"

//   }
// ]
const Products = ({onAddItem,onRemoveItem,eventState}) => {
  const [items,setItems]=useState([  
    // {
    //   id:0,
    //   discountedPrice : 340,
    //   price: 450,
    //   title:"Title of the Item",
    //   thumbnail:"placeholder.png"
  
    // },
    // {
    //   id:1,
    //   discountedPrice : 900,
    //   price: 500,
    //   title:"Title  the Item",
    //   thumbnail:"placeholder.png"
  
    // }
    
  ])
  const [loader,setLoader]=useState(true);//create this state variable to manage wheather loader should show or not.and we intially take value as true because intially loader should me shown. 
  const [presentItems,setPresentItems]=useState([])//create this state variable to keep track which item is added to cart.create an array which contain all the items added to cart.
  useEffect(()=>{
    //Here we using Fetch Api to Get data from real time database.
    // const result=fetch("https://react-project-5611c-default-rtdb.firebaseio.com/items.json")
    // // console.log(result);//We get result as promise and that promise is in pending state but when we expand it , it is fulfilled because this is an asynchronous process.
    // result.then((response)=>{
    //   return response.json();
    // }).then((responce)=>{
    //   console.log(responce);
    // })
    // .catch(error=>{//if there is any error in url then we can handle it using catch().
    //   console.log(error);
    // })
 
     //Here we using Axios to Get data from real time database.
    // const result=axios.get("https://react-project-5611c-default-rtdb.firebaseio.com/items.json");//we get promise object here
    // result.then(response=>{
    //   // console.log(response);
    //   const data=response.data;//All data present in data keyword in response.
    //   const transformeddata=data.map((item,index)=>{
    //     return{
    //       ...item,
    //       id:index//We have to pass id to key hence including id through index.
    //     }
    //   })
    //   // console.log(transformeddata);
    //   setItems(transformeddata);//Dynamically Use data from database. 
      
    // })
    // .catch(error=>{
    //   console.log(error);
    // })

    //Using Async/Await
    async function fetchItems(){
     try{
      const result=axios.get("https://react-project-5611c-default-rtdb.firebaseio.com/items.json");//we get promise object here
      let response = await result;
        const data=response.data;//All data present in data keyword in response.
        const transformeddata=data.map((item,index)=>{
          return{
            ...item,
            // quantity:0,//Intially quantity will be zero
            id:index//We have to pass id to key hence including id through index .
          }
        })
        setLoader(false);
        setItems(transformeddata);//Dynamically Use data from database. 
     }catch(error){
          console.log("error :-" , error)
          setLoader(false);
          alert("Error Present");
     }
      
    }
    fetchItems();

  },[])
  //handleEvent is sideeffect hence we use useEffect
  useEffect(()=>{
    if(eventState.id>-1){
      if(eventState.type===1){
        handleAddItem(eventState.id);
      }else if(eventState.type=== -1){
        handleRemoveItem(eventState.id);
      }
    }
  },[eventState])
  const handleAddItem=id=>{//Creating this function to keep tracking which item is added to cart.
      // console.log(id);
      // if(presentItems.indexOf(id)>-1){//Through indexOf(id) we finding index of item(id) and we include if condition because when item already present in cart but we want to increase its quantity then cart button number shouldnot increase for that item.
      //   return;
      // }
      // setPresentItems([...presentItems,id]);//if that item doesnot present we add that item in array.
      // onAddItem();//increase counting on cart button.
      let data=[...items];
      let index=data.findIndex(e=>e.id===id);//Here e is the element of data array which we passed into arrow function and we finding index of item so we can increase its quantity.
      data[index].quantity+=1;//Now increased quantity of item using quantity variable instead of counter. 
      setItems(data);
      onAddItem(data[index]);//Here we passes the complete item because data[index] conatin the complete item.(Now whenever the item is added to cart then we pass the data from child to parent component called as lift the state up )      
  }
  const handleRemoveItem=id=>{//Creating this function to keep tracking which item is removed from cart.
    // console.log(id);
    // let index=presentItems.indexOf(id);
    // if(index>-1){//checking if that item present in cart or not .if present the delete that item from both array and cart.
      // let items=[...presentItems];
      // items.splice(index,1);//delete that item from array using splice function.Check about splice function in w3school.
      // setPresentItems([...items]);
      // onRemoveItem();//decrease counting on cart button.
      let data=[...items];
      let index=data.findIndex(e=>e.id===id);
      if(data[index].quantity!=0){//if quantity is already zero we can't reduce it further.
        data[index].quantity-=1;
        setItems(data);
        onRemoveItem(data[index])
      }
    // }
  }
  const updateItemTitle=async(itemId)=>{//we need itemId to identify item which we have to update.
    console.log(`item with id :  ${itemId}`)
    try{//To handle error we create try-catch block.
      // the PATCH method is a request method in HTTP for making partial changes to an existing resource.PATCH is somewhat analogous to the "update" concept found in CRUD (in general, HTTP is different than CRUD, and the two should not be confused).
      let titles=`item with id :  ${itemId}`;//Updating title dynamically.
      const result=axios.patch(`https://react-project-5611c-default-rtdb.firebaseio.com/items/${itemId}.json`,{title: titles} );//we put link as https://react-project-5611c-default-rtdb.firebaseio.com/items/0.json in axios because we want to work on specific cart not whole data and to make link as dynamic we write ${itemId} in link.
    let response =await result;
    let data=[...items]
    let index=data.findIndex((e)=>{//learn about findIndex from w3school
      return e.id===itemId//To Study About === :- https://www.guru99.com/difference-equality-strict-operator-javascript.html
    }
    )
    data[index]['title']=titles;
    setItems(data);
    }catch(error){
      alert(error);
    }


  }
  return (<>
    <div className="product-list">
      <div className="product-list--wrapper">
        {/* <ListItem  data={items[0]}/>
        <ListItem data={items[1]}/> */}
         {/* In React , we can define an array which contain html like elements and react will rendored that array sequencely. */}
         {/* {[<div>Hello</div>, <p>ninja</p>   ]} */}

         {
          items.map(item=>{//Here we rendored items array using arrow function. item used as a parameter in arrow function.
            console.log(item)
            return <ListItem onAdd={handleAddItem} onRemove={handleRemoveItem} key={item.id} data={item} updateItemTitle={updateItemTitle}/>//Using key attribute.
          })
         }

          {/* This arrow function rendored as:- {<ListItem  data={items[0]},<ListItem  data={items[1]} }*/}

      </div>
    </div>
     {loader && <Loader/>}
     {/* Here we conditinally rendored this loader. */}
     {/* we want as soon as page is being loaded this loader should be show and  as soon as list is being loaded or if their is any error then loader should be disapperar. */}
    </>    
    
  )
}

export default Products