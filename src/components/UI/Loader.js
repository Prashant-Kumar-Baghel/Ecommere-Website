import React from 'react'
import ReactDom from 'react-dom';//we have to import this because create portal is the method provided by react dom.

{/* React portals come up with a way to render children into a DOM node that occurs outside the DOM hierarchy of the parent com
ponent.
    Syntax:- ReactDOM.createPortal(child, container)*/}
export const Backdrop=props=>{
  const handleClick=()=>{
    let x=props.onClose;
    console.log(x);
    if(props.onClose){
       console.log(props.onClose());
    }
  }
      return(
        <div onClick={handleClick} className="loader-overlay"></div>
        
      )
}
const Loader = () => {
  return (
    
    ReactDom.createPortal(<>
    <Backdrop/>
    <div className="loading-dots">
        <div>Loading</div> 
        <div className="loading-dots--dot"></div>
        <div className="loading-dots--dot"></div>
        <div className="loading-dots--dot"></div>
      </div></>,document.getElementById("Loader-root")//we create the conatiner with id "Loader-root" in index.html
    )
    
  )
}

export default Loader