import React from 'react'

const Deliverable = (props, {deliverable, onAdd, onRemove, onFieldChange}) => {

  return (
    <div className="del del25">
            {deliverable.map((del, index) => (
              <input
                type="text"
                key={index}
                placeholder="Deliverable"
                onBlur={() => onFieldChange(index)}

              ></input>
            ))}
            <button
              className="addInput"
              onClick={onAdd}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
            <button
              className="removeInput"
              onClick={onRemove}
              disabled={deliverable.length <= 1}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>
  )
}

export default Deliverable