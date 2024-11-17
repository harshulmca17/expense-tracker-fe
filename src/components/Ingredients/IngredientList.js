import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../UI/table";
import { CardHeader, CardTitle, CardContent } from "../UI/cards";
import Card from '../UI/Card';
import { Trash2 } from "lucide-react";
import ExpensesFetchFromDB from '../../Query/fetchExpenses';



const IngredientList = ({ onRemoveItem }) => {
  
  const { data: expenses, isLoading: expensesLoading, error: expensesError } = ExpensesFetchFromDB()

  if (expenses && expenses.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <p className="text-center text-gray-500">No expenses found.</p>
        </CardContent>
      </Card>
    );
  }
  if (!expenses || expenses.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <p className="text-center text-gray-500">Loading Expenses...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="ingredient-list w-full"
      style={{
        "width": '60rem',
        "max-width": '80%',
        "margin": "auto",
      }}>
      <Card className="w-full">
        <CardHeader>
      
          <CardTitle className="text-2xl font-bold">Loaded Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Title</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Description</TableHead>
                  <TableHead className="font-semibold text-right">Amount</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expensesLoading ? <p>Loading Expenses</p> : (expenses.map((ig) => (
                  <TableRow
                    key={ig.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium">{ig.name}</TableCell>
                    <TableCell>{ig.title}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                        {ig.category}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {ig.description}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      Rs. {Number(ig.amount).toLocaleString()}
                    </TableCell>
                    {/* <TableCell>
                      <button
                        onClick={() => onRemoveItem(ig.id)}
                        className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                        aria-label="Delete item"
                      >
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      </button>
                    </TableCell> */}
                  </TableRow>
                )))}

              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section >
  );
};

export default IngredientList;