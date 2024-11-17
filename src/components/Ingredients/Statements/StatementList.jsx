import { DollarSignIcon, CalendarIcon, TagIcon, UserIcon } from "lucide-react";
import React from "react";
import styles from './Statement.css';

export default function ExpensesList({ expenses }) {
    return (
        <div className="expenses-container">
            <div className="expenses-card">
                <div className="card-content">
                    <h2 className="expenses-title">
                        Recent Expenses
                    </h2>

                    <div className="expenses-list">
                        {expenses?.map((expense) => {
                            if (expense.title && expense.amount && expense.userId && expense.category) {
                                const expenseDate = new Date(expense.created_at);
                                // Remove time part for accurate date comparison
                                expenseDate.setHours(0, 0, 0, 0);
                                return (
                                    <div className="expense-item">
                                        <div className="expense-header">
                                            <div className="user-info">
                                                <UserIcon className="icon icon-blue" />
                                                <div className="user-details">
                                                    <p>{expense.name} </p>
                                                    <p>{expense.title}</p>
                                                </div>
                                            </div>
                                            <span className="expense-amount">
                                                Rs. {new Intl.NumberFormat('en-US', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                }).format(expense.amount)}
                                            </span>
                                        </div>
                                        <p className="expense-description">
                                            {expense.category}
                                        </p>
                                        <p className="expense-description">
                                            {expense.description}
                                        </p>
                                        <div className="expense-date">
                                            <CalendarIcon className="icon-small icon-purple" />
                                            <span>{expenseDate.toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}