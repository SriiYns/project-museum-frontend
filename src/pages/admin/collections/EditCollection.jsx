import * as React from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import EditCollectionForm from '@/components/admin/collections/edit';
import Header from '@/components/header';
import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';

const EditCollection = () => {
	const { toast } = useToast();
	const navigate = useNavigate();

	const { id } = useParams();
	const [loading, setLoading] = React.useState(true);
	const [collection, setCollection] = React.useState({});

	React.useEffect(() => {
		setLoading(true);

		const fetchData = async () => {
			try {
				const { data } = await axios.get('collections/' + id);
				setCollection(data.data);
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
				navigate('/admin/dashboard');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id, navigate, toast]);

	if (loading) {
		return (
			<div className='flex justify-center min-h-screen pt-20'>
				Loading...
			</div>
		);
	}

	return (
		<div className='space-y-8'>
			<Header
				title='Edit Koleksi'
				description='Edit data informasi Koleksi yang ada pada Museum Nusa Tenggara Barat.'
			/>

			<EditCollectionForm collection={collection} />
		</div>
	);
};

export default EditCollection;
