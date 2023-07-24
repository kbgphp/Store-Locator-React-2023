import React from 'react'

const Form = ({ placeholder, type, margin, handleChange, name, value, isValid=false }) => {
  return (
    <div class={`form-group ${margin}`}>
      <input type={type} class={`form-control ${isValid ? 'is-invalid':''}`} value={value} name={name} onChange={handleChange}  placeholder={placeholder} />
    </div>
  )
}

export default Form;
