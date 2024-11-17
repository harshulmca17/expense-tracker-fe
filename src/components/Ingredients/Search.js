import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';
import './Search.css';
import ExpensesFetchFromDB from '../../Query/fetchExpenses';

const Search = React.memo(props => {
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();

  return (
    <section className="search">
      
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)}
          />
        </div>
       </section>
  );
});

export default Search;
