import * as React from 'react';

import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';

const useTicket = () => {
	const { toast } = useToast();

	const [error, setError] = React.useState(null);
	const [loading, setLoading] = React.useState(true);
	const [tickets, setTickets] = React.useState([]);

	React.useEffect(() => {
		setLoading(true);
		setError(null);

		const fetchData = async () => {
			try {
				const { data } = await axios.get('tickets');
				setTickets(data.data);
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
				description: 'Deleting ticket...',
				variant: 'default',
			});

			await axios.delete('tickets/' + id);
			setTickets(tickets.filter((ticket) => ticket._id !== id));

			toast({
				title: 'Success',
				description: 'Collection deleted successfully',
				variant: 'success',
			});
		} catch (error) {
			toast({
				title: 'Error',
				description: error.response?.data?.message,
				variant: 'destructive',
			});
			setError(error.message || 'Failed to delete data');
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		error,
		tickets,
		handleDelete,
	};
};

export default useTicket;
