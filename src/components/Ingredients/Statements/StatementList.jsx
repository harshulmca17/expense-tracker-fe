import { DollarSignIcon, CalendarIcon, TagIcon, UserIcon, DownloadIcon } from "lucide-react";
import React from "react";
import styles from './Statement.css';

export default function ExpensesList({ expenses }) {
    const downloadCSV = () => {
        // Filter out expenses with missing data (same logic as in your render)
        const validExpenses = expenses.filter(expense => 
            expense.title && expense.amount && expense.userId && expense.category
        );

        // Create CSV header
        const csvHeader = ['Name', 'Title', 'Amount', 'Category', 'Description', 'Date'].join(',');

        // Create CSV rows
        const csvRows = validExpenses.map(expense => {
            const expenseDate = new Date(expense.created_at).toLocaleDateString();
            const amount = new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(expense.amount);

            // Escape fields to handle commas and quotes in the data
            const escapeCsvField = (field) => {
                const stringField = String(field || '');
                if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
                    return `"${stringField.replace(/"/g, '""')}"`;
                }
                return stringField;
            };

            return [
                escapeCsvField(expense.name),
                escapeCsvField(expense.title),
                escapeCsvField(amount),
                escapeCsvField(expense.category),
                escapeCsvField(expense.description),
                escapeCsvField(expenseDate)
            ].join(',');
        });

        // Combine header and rows
        const csvContent = [csvHeader, ...csvRows].join('\n');

        // Create and download the file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `expenses_${new Date().toLocaleDateString()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="expenses-container">
            <div className="expenses-card">
                <div className="card-content">
                    <div className="expenses-header">
                        <h2 className="expenses-title">
                            Recent Expenses
                        </h2>
                        <button 
                            onClick={downloadCSV}
                            className="download-button"
                        >
                            <DownloadIcon className="icon-small" />
                                                </button>
                    </div>

                    <div className="expenses-list">
                        {expenses?.map((expense) => {
                            if (expense.title && expense.amount && expense.userId && expense.category) {
                                const expenseDate = new Date(expense.created_at);
                                expenseDate.setHours(0, 0, 0, 0);
                                return (
                                    <div className="expense-item" key={expense.id}>
                                        <div className="expense-header">
                                            <div className="user-info">
                                                <UserIcon className="icon icon-blue" />
                                                <div className="user-details">
                                                    <p>{expense.name}</p>
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