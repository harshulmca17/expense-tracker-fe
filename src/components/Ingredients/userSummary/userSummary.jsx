// app/components/LastMonth.tsx
'use client';

import {
  BarChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from "lucide-react";
import { format, subDays } from "date-fns";


import styles from './userSummar.module.css';
import UserFetchFromDB from "../../../Query/fetchUsers";
import ExpensesFetchFromDB from "../../../Query/fetchExpenses";




const userExpenses = [
  {
    name: "John Doe",
    expenseCount: 12,
    totalAmount: "2,340.00",
  },
  {
    name: "Alice Smith",
    expenseCount: 8,
    totalAmount: "1,750.00",
  },
  {
    name: "Bob Johnson",
    expenseCount: 15,
    totalAmount: "3,100.00",
  },
  {
    name: "Emma Wilson",
    expenseCount: 6,
    totalAmount: "980.00",
  },
];
function calculateUserExpenses(users, expenses) {
  // Initialize the result array
  const userExpensesSummary = [];

  // Process each user
  users.forEach(user => {
    // Filter expenses for current user
    const userExpenses = expenses.filter(expense =>
      expense.userId === user.id.toString() &&
      expense.amount && // Check if amount exists and is not empty
      expense.amount.trim() !== ''
    );

    // Calculate total amount
    const totalAmount = userExpenses.reduce((sum, expense) => {
      const amount = parseFloat(expense.amount) || 0;
      return sum + amount;
    }, 0);

    // Create user summary object
    const userSummary = {
      name: user.name,
      expenseCount: userExpenses.length,
      totalAmount: new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(totalAmount)
    };

    userExpensesSummary.push(userSummary);
  });

  return userExpensesSummary;
}
const StatCard = ({ stat }) => (
  <div className="rounded-lg border p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 rounded-full bg-gray-100">
        <stat.icon className="h-6 w-6 text-gray-600" />
      </div>
      <div
        className={`flex items-center ${stat.increasing ? "text-green-600" : "text-red-600"}`}
      >
        {stat.increasing ? (
          <TrendingUp className="h-4 w-4 mr-1" />
        ) : (
          <TrendingDown className="h-4 w-4 mr-1" />
        )}
        <span className="text-sm font-medium">{stat.change}</span>
      </div>
    </div>
    <h3 className="text-gray-600 text-sm font-medium">{stat.name}</h3>
    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
  </div>
);

const UserExpenseRow = ({ user }) => (
  <div className={styles.expenseRow}>
    <div className={styles.userInfo}>
      <div className={styles.userAvatar}>
        {user.name.charAt(0)}
      </div>
      <span className={styles.userName}>{user.name}</span>
    </div>
    <div className={styles.expenseInfo}>
      <div className={styles.expenseCount}>
        <span>{user.expenseCount}</span> expenses
      </div>
      <div className={styles.expenseAmount}>
        Rs. {user.totalAmount}
      </div>
    </div>
  </div>
);

export default function LastMonth({ startDate, endDate, expenses }) {
  const { data: users, isLoading: isLoadingUsers } = UserFetchFromDB();


  const today = endDate;
  const thirtyDaysAgo = startDate;

  // const today = new Date();
  // const thirtyDaysAgo = subDays(today, 30);

  if (isLoadingUsers) {
    return <p>Loading Summary....</p>;
  }

  console.log(users, expenses, calculateUserExpenses(users, expenses))
  return (
    <div className={`${styles.container}`}>
      <div className={styles.header}>
        {/* <h2 className={styles.title}>
          {format(thirtyDaysAgo, "MMMM d")} - {format(today, "MMMM d, yyyy")}
        </h2> */}
        {/* <p className={styles.subtitle}>
          Performance metrics for the last 30 days
        </p>*/}
      </div>

      {/* <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <StatCard key={stat.name} stat={stat} />
        ))}
      </div> */}

      <div className={styles.expensesSection}>
        <div className={styles.expensesCard}>
          <div className={styles.expensesHeader}>
            <h3>User Expenses Overview</h3>
            <h3 className={styles.title}>
              {format(thirtyDaysAgo, "MMMM d")} - {format(today, "MMMM d, yyyy")}
            </h3>
          </div>
          <div className={styles.expensesList}>
            {calculateUserExpenses(users, expenses).map((user) => (
              <UserExpenseRow key={user.name} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

