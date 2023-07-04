import React from 'react'

function Form({name, onSubmit, children}) {
  return (
    <form
    className={`form form_type_${name}`}
    name={`${name}-form`}
    onSubmit={onSubmit}
    >
    {children} 
  </form>
  )
}

export default Form