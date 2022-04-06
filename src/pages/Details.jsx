import React from 'react'
import {Link} from 'react-router-dom'

const Details = () => {
  return (
    <div>
     <h1>
       <Link to={`/item/${1}`}  >1</Link>
     </h1>
     <h1>
       <Link to={`/item/${2}`}>2</Link>
     </h1>
     <h1>
       <Link to={`/item/${3}`}>3</Link>
     </h1>
    </div>
  )
}

export default Details