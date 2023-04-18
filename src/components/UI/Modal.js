import React, { Fragment } from 'react'
import ReactDom from "react-dom"
import  {Backdrop}  from './Loader'
// React Fragment is a feature in React that allows you to return multiple elements from a React component by allowing you to group a list of children without adding extra nodes to the DOM.
const Modal = ({onClose, children}) => { // here we get all jsx as children.
  return (
    
       
        ReactDom.createPortal(<React.Fragment>
            {/* passed onClose function on Backdrop becaus ewe want to close Modal when click on overlay. */}
            <Backdrop onClose={onClose}/>
            <div className="modal">
                {/* we want to close modal when we click on x button hence called onClose function. */}
                <button type="close" onClick={onClose}>X</button>
                <div className="content">{children}</div>
            </div>
        </React.Fragment>
            ,document.getElementById("modal-root")
        )
        
  )
}

export default Modal