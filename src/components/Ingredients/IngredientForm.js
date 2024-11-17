import React, { useState } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import './IngredientForm.css';
import UserFetchFromDB from '../../Query/fetchUsers';
import { useQueryClient } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IngredientForm = React.memo(props => {
  const [enteredTitle, setEnteredTitle] = useState('');

  const { data: users, isLoading, error: userError } = UserFetchFromDB();
  const [userName, setUserName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [userId, setUserId] = useState('');
  console.log('RENDERING INGREDIENT FORM');


  const SubmitHandler = async (event) => {
    event.preventDefault();
    if (userName && enteredTitle && enteredAmount && selectedCategory && userId) {
      props.onAddIngredient({ name: userName, title: enteredTitle, amount: enteredAmount, description, category: selectedCategory, config: '{}', userId: userId });
      toast.success(`Expense for ${userName} Added Succesfully...`,)
      setUserName('');
      setSelectedCategory('');
      setDescription('');
      setEnteredAmount('')
      setUserId('');
    } else {
      toast.error('Some Error Occured! Fields are completely filled...',)
    }


  };
  return (
    <section className="ingredient-form">
      <Card>
        <ToastContainer position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" />
        <form onSubmit={SubmitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name {isLoading ? 'Lading' : ''}</label>
            <select
              id="name"
              // value={userId}
              onChange={(event) => {
                const selectedUser = users.find(user => user.id == event.target.value);
                console.log(selectedUser)
                if (selectedUser) {
                  setUserId(selectedUser.id);
                  setUserName(selectedUser.name);
                }
              }}
            >
              <option value="">Select a User</option>
              {users?.map((ele) => (
                <option
                  key={ele.id}
                  value={ele.id}
                >
                  {ele.name}
                </option>
              ))}
            </select>

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
