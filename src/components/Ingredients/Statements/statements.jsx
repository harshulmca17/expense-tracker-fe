import { useState } from "react";
import ExpensesFetchFromDB from "../../../Query/fetchExpenses"
import Search from "../Search"
import ExpensesList from "./StatementList"


export default function Statements({ expenses }) {

    return (
        <div>
            <ExpensesList expenses={expenses} />
        </div>)
}

