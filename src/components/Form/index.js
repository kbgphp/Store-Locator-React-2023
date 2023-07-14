import React from 'react'

const Form = ({ placeholder, type, margin}) => {
  return (
    <div class={`form-group ${margin}`}>
      {/* <label for="exampleInputEmail1">Email address</label> */}
      <input type={type} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={placeholder} />
      {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
    </div>
  )
}

export default Form;
