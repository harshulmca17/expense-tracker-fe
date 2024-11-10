import React, { useState } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [enteredTitle, setEnteredTitle] = useState('');

  const [userName, setUserName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  console.log('RENDERING INGREDIENT FORM');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngredient({ name: userName, title: enteredTitle, amount: enteredAmount, description, category: selectedCategory });
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input
              type="text"
              id="title"
              value={userName}
              onChange={event => {
                setUserName(event.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="title">Expense</label>
            <input
              type="text"
              id="title"
              value={enteredTitle}
              onChange={event => {
                setEnteredTitle(event.target.value);
              }}
            />
          </div>
          
          <div className="form-control">
            <label htmlFor="amount">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={event => {
                setDescription(event.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="category">Type</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={event => {
                setSelectedCategory(event.target.value);
              }}
            >
              <option value="">Select a category</option>
              <option value="Personal">Personal</option>
              <option value="Common">Common</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={enteredAmount}
              onChange={event => {
                setEnteredAmount(event.target.value);
              }}
            />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Expense</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
