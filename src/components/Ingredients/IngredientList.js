import React from 'react';

import './IngredientList.css';

const IngredientList = props => {
  console.log('RENDERING INGREDIENTLIST');
  return (
    <section className="ingredient-list">
      <h2>Loaded Expense</h2>
      <ul>
        {props.ingredients.map(ig => (
          <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
            <span>{ig.name}</span>
            <span>{ig.title}</span>
            <span>{ig.category}</span>

            <span>{ig.description}</span>

            <span>{ig.amount}</span>
            
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
