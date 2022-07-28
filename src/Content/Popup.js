
// import FolderTrack from './FolderTrack'
// import { useState } from "react"

//import PAddFolder from "./popups/AddFolder"


function Popup(props){
    // const [isDisplay,setIsDisplay]=useState(props.isDisplay)

    const closePopup=()=>{
        props.setIsDisplayPopup(false)
    }

    return(
        
        props.isDisplay &&
        <div className="popup-bg">       
            <div className="popup-content">

                <i className="zmdi zmdi-close-circle-o" onClick={closePopup}></i>
                {/* <PAddFolder closePopup={closePopup} /> */}
            </div>
        </div>
    )
}

export default Popup