import React from 'react';

function Input({Id, index, type, value, currIndex, id, name, onClick}, ref) {
  return (
    <div key={index} className="custom-control custom-radio custom-control-inline">
      <input 
        type={type} 
        ref={ref}
        id={id} 
        name={name}
        className="custom-control-input"
        value={value} 
        onClick={onClick}
        />
      <label className="custom-control-label" htmlFor={currIndex===Id ? index : ""}>{value}</label>
    </div>  
  )
}

const forwardRef = React.forwardRef(Input);

export default forwardRef;