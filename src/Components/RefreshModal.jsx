import React from 'react'
import { useEffect } from 'react'

const RefreshModal = ({display, onClose}) => {
    // useEffect(() => {
    //     console.log("Opened")
    //     onClose()
    // }, [])

    if (display == true){
        onClose()
        console.log("Opened")
        return (null)
    }
    // return (
    //     <div className="delModalContainer">
    //       <div className="myDeleteModal">
    //         <button onClick={onClose}>
    //           <i className="fa-solid fa-x closeModal"></i>
    //         </button>
    //       </div>
    //     </div>
    //   );
    return(null)
}

export default RefreshModal