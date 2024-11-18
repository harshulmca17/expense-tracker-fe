// components/LastMonth.jsx
"use client"

import React from 'react';
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../accordion";
import style from './userSummar.module.css';
import UserFetchFromDB from '../../../Query/fetchUsers';
import Card from '../../UI/Card';

function calculateUserExpenses(users, expenses) {
  const userExpensesSummary = [];

  users.forEach(user => {
    const userExpenses = expenses.filter(expense =>
      expense.userId === user.id.toString() &&
      expense.amount &&
      expense.amount.trim() !== ''
    );

    const commonExpenses = userExpenses.filter(expense =>
      expense.category?.toLowerCase() === 'common'
    );
    const personalExpenses = userExpenses.filter(expense =>
      expense.category?.toLowerCase() === 'personal'
    );

    const calculateTotal = (expenseArray) => {
      return expenseArray.reduce((sum, expense) => {
        const amount = parseFloat(expense.amount) || 0;
        return sum + amount;
      }, 0);
    };

    const totalCommonAmount = calculateTotal(commonExpenses);
    const totalPersonalAmount = calculateTotal(personalExpenses);
    const totalAmount = totalCommonAmount + totalPersonalAmount;

    const userSummary = {
      name: user.name,
      expenseCount: userExpenses.length,
      totalAmount: new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(totalAmount),
      commonExpenses: {
        count: commonExpenses.length,
        amount: new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(totalCommonAmount)
      },
      personalExpenses: {
        count: personalExpenses.length,
        amount: new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(totalPersonalAmount)
      }
    };

    userExpensesSummary.push(userSummary);
  });

  return userExpensesSummary;
}

const UserExpenseRow = ({ user }) => (
  <AccordionItem value={user.name}>
    <AccordionTrigger className="expense-trigger">
      <div className="expense-summary">
        <div className="user-info">
          {/* <div className="user-avatar">{user.name.charAt(0)}</div> */}
          <span className="user-name">{user.name}</span>
        </div>
        <div className="expense-totals">
          <div className="expense-count">
            <span>{user.expenseCount}</span> expenses
          </div>
          <div className="expense-amount">
            Rs. {user.totalAmount}
          </div>
        </div>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      <div className="expense-details">
        <div className="expense-type common">
          <h4>Common Expenses</h4>
          <div className="expense-stats">
            <span>{user.commonExpenses.count} expenses. </span>
            <span>Rs. {user.commonExpenses.amount}</span>
          </div>
        </div>
        <div className="expense-type personal">
          <h4>Personal Expenses</h4>
          <div className="expense-stats">
            <span>{user.personalExpenses.count} expenses. </span>
            <span>Rs. {user.personalExpenses.amount}</span>
          </div>
        </div>
      </div>
    </AccordionContent>
  </AccordionItem>
);

export default function LastMonth({ startDate, endDate, expenses }) {
  const { data: users, isLoading: isLoadingUsers } = UserFetchFromDB();

  if (isLoadingUsers) {
    return <div className="loading">Loading Summary....</div>;
  }

  const thirtyDaysAgo = startDate;
  const today = endDate;
  console.log(calculateUserExpenses(users, expenses), 'calculateUserExpenses(users, expenses)')
  return (
    <Card> <div className="last-month-container">
      <div className="header">
        <h3 className="title">User Expenses Overview</h3>
        <h3 className="date-range">
          {format(thirtyDaysAgo, "MMMM d")} - {format(today, "MMMM d, yyyy")}
        </h3>
      </div>
      <Accordion type="single" collapsible className="expenses-accordion">
        {calculateUserExpenses(users, expenses).map((user) => (
          <UserExpenseRow key={user.name} user={user} />
        ))}
      </Accordion>
    </div></Card>
  );
}