import React from 'react'

function Button(props) {
  const { onClick, className, children } = props;
  return (
    <button onClick={onClick} type='button' className={className}>{children}</button>
  )
}

export default Button;