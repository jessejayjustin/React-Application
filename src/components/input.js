import React from 'react';

function Input({type, className, id, value}, ref) {
  return (
    <div className="custom-control custom-radio custom-control-inline">
      <input 
        ref={ref}
        type={type} 
        className={className}
        id={id} 
        value={value} 
        />
      <label className="custom-control-label" htmlFor={id}>{value}</label>
    </div>  
  )
}

const forwardRef = React.forwardRef(Input);

export default forwardRef;