import React, { useReducer, useEffect, useCallback, useMemo, useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';
import { useQueryClient } from '@tanstack/react-query';
import LastMonth from './userSummary/userSummary';
import Card from '../UI/Card';
import NavigationButton from '../Button/button';
import Statements from './Statements/statements';
import DatePicker from '../DatePicker/datePicker';
import DatePickerNew from '../DatePicker/datePicker';
import ExpensesFetchFromDB from '../../Query/fetchExpenses';



const Ingredients = () => {

  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifer,
    clear
  } = useHttp();
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 7)));
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (!isLoading && !error && reqIdentifer === 'REMOVE_INGREDIENT') {
      // dispatch({ type: 'DELETE', id: reqExtra });
    } else if (!isLoading && !error && reqIdentifer === 'ADD_INGREDIENT') {
      // dispatch({
      //   type: 'ADD',
      //   ingredient: { id: data.name, ...reqExtra }
      // });
    }
  }, [data, reqExtra, reqIdentifer, isLoading, error]);

  function UpdateExpenses() {
    // const queryClient = useQueryClient();
    // queryClient.invalidateQueries({ queryKey: ['expenses'] });
  }
  const addIngredientHandler = useCallback(async (ingredient) => {
    try {
      const response = await fetch('http://localhost:3002/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingredient)
      });

      if (!response.ok) {
        throw new Error('Failed to add expense');
      }
      UpdateExpenses();
      const data = await response.json();
      // Handle success - you might want to update state or call another function here
      return data;
    } catch (error) {
      // Handle error - you might want to show an error message or update error state
      console.error('Error adding expense:', error);
      throw error;
    }
  }, []);

  const filterExpensesByDateRange = (expenses, startDate, endDate) => {
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.created_at);
      // Remove time part for accurate date comparison
      expenseDate.setHours(0, 0, 0, 0);
      const startDateTime = new Date(startDate);
      startDateTime.setHours(0, 0, 0, 0);
      const endDateTime = new Date(endDate);
      endDateTime.setHours(0, 0, 0, 0);
  
      return expenseDate >= startDateTime && expenseDate <= endDateTime;
    });
  };
  
  const removeIngredientHandler = useCallback(
    ingredientId => {
      sendRequest(
        `https://react-hooks-update.firebaseio.com/ingredients/${ingredientId}.json`,
        'DELETE',
        null,
        ingredientId,
        'REMOVE_EXPENSE'
      );
    },
    [sendRequest]
  );

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        onRemoveItem={removeIngredientHandler}
      />
    );
  }, [removeIngredientHandler]);
  const { data: expenses, isLoading: isLoadingExpenses } = ExpensesFetchFromDB();

  if (isLoadingExpenses)
    return <p>Expenses Are Loading....</p>


  const finalExpenses = filterExpensesByDateRange(expenses, startDate, endDate);
  console.log(finalExpenses,expenses,'finalExpenses')
  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />
      {/* <section style={{
        width: '30rem',
        maxWidth: '80%',
        margin: '2rem auto'
      }}>
        <Card>
          <NavigationButton link ='/statement' text='See Statement'/>
        </Card>
      </section> */}

      <section style={{
        width: '30rem',
        maxWidth: '100%',
        margin: '2rem auto'
      }}>
        <DatePickerNew startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
      </section>
      <section style={{
        width: '30rem',
        maxWidth: '100%',
        margin: '2rem auto'
      }}>
        <LastMonth startDate={startDate} endDate={endDate} expenses={finalExpenses} />
      </section>
      <section style={{
        width: '30rem',
        maxWidth: '100%',
        margin: '2rem auto'
      }}>
        <Card>
          <Statements startDate={startDate} endDate={endDate} expenses={finalExpenses} />
        </Card>
      </section>


    </div>
  );
};

export default Ingredients;
