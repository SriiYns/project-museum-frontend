import * as React from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import EditUserForm from '@/components/admin/users/edit';
import Header from '@/components/header';
import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';

const EditUser = () => {
	const { toast } = useToast();
	const navigate = useNavigate();
	const { id } = useParams();
	const [loading, setLoading] = React.useState(true);
	const [user, setUser] = React.useState({});

	React.useEffect(() => {
		setLoading(true);

		const fetchData = async () => {
			try {
				const { data } = await axios.get('users/' + id);
				setUser({
					...data.data,
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
				console.error(error);
				navigate('/admin/user');
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
				title='Edit Pengguna'
				description='Edit data informasi Pengguna yang ada pada Museum Nusa Tenggara Barat.'
			/>

			<EditUserForm user={user} />
		</div>
	);
};

export default EditUser;
