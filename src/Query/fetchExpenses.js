
import { useQuery } from '@tanstack/react-query';


const fetchExpensesFromAPI = async () => {
    const response = await fetch('http://localhost:3002/api/expenses');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data?.result ?? [];
};

const ExpensesFetchFromDB = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['expenses'],
        queryFn: fetchExpensesFromAPI,
        staleTime: 0, // 5 minutes
        cacheTime: 0, // 30 minutes
    },);

    return { data, isLoading, error };
}

export default ExpensesFetchFromDB;