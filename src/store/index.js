import {createStore,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import mainReducer from "../reducers"
// //creating reducer
// const rootReducer=(state,action)=>{
//   return state
// }
//creating store.
const store= createStore(mainReducer,
  {
    items:[],
    totalAmount:0
  },
  composeWithDevTools(applyMiddleware(thunk)))
  
export default store;
