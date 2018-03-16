import React from 'react';

function Search(props) {
  const {children, onChange, value, onSubmit} = props;
  return (
    <form onSubmit={onSubmit}>
      <input 
        onChange={onChange}
        type="text" 
        value = {value}
        placeholder="search"/>
      <button type="submit">
        {children}
      </button>
    </form>
  )
}

export default Search;