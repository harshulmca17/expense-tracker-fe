
import { useQuery } from '@tanstack/react-query';


const fetchUsersFromAPI = async () => {
    const response = await fetch('http://192.168.0.128:3002/api/users');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data?.users ?? [];
};

const UserFetchFromDB = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsersFromAPI,
        staleTime: 0, // 5 minutes
        cacheTime: 0, // 30 minutes
    },);

    return { data, isLoading, error };
}

export default UserFetchFromDB;