import * as React from 'react';

import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';

const useUser = () => {
	const { toast } = useToast();

	const [error, setError] = React.useState(null);
	const [loading, setLoading] = React.useState(true);
	const [users, setUsers] = React.useState([]);

	React.useEffect(() => {
		setLoading(true);
		setError(null);

		const fetchData = async () => {
			try {
				const { data } = await axios.get('users');
				setUsers(data.data);
			} catch (error) {
				if (isAxiosError(error)) {
					toast({
						title: 'Error',
						description: error.response?.data?.message,
						variant: 'destructive',
					});
				} else {
					toast({
						title: 'Error',
						description: error.message,
						variant: 'destructive',
					});
				}
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [toast]);

	const handleDelete = async (id) => {
		setLoading(true);
		setError(null);

		try {
			toast({
				title: 'Loading',
				description: 'Deleting user...',
				variant: 'default',
			});

			await axios.delete('users/' + id);
			setUsers(users.filter((user) => user._id !== id));

			toast({
				title: 'Success',
				description: 'User deleted successfully',
				variant: 'success',
			});
		} catch (error) {
			if (isAxiosError(error)) {
				toast({
					title: 'Error',
					description: error.response?.data?.message,
					variant: 'destructive',
				});
			} else {
				toast({
					title: 'Error',
					description: error.message,
					variant: 'destructive',
				});
			}
			setError(error.message || 'Failed to delete user');
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleUpdate = async (id, updatedData) => {
		setLoading(true);
		setError(null);

		try {
			const { data } = await axios.put('users/' + id, updatedData);

			setUsers(users.map((user) => (user._id === id ? data.data : user)));

			toast({
				title: 'Success',
				description: 'User updated successfully',
				variant: 'success',
			});
		} catch (error) {
			if (isAxiosError(error)) {
				toast({
					title: 'Error',
					description: error.response?.data?.message,
					variant: 'destructive',
				});
			} else {
				toast({
					title: 'Error',
					description: error.message,
					variant: 'destructive',
				});
			}
			setError(error.message || 'Failed to update user');
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		error,
		users,
		handleDelete,
		handleUpdate,
	};
};

export default useUser;
