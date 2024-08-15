import * as React from 'react';

import { Navigate } from 'react-router-dom';
import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';

const ProfilePage = () => {
	const { toast } = useToast();

	const [loading, setLoading] = React.useState(true);
	const [profile, setProfile] = React.useState({});

	React.useEffect(() => {
		const fetchProfile = async () => {
			setLoading(true);

			try {
				const { data } = await axios.get('/users/profile');
				setProfile(data.data);
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
				Navigate('/admin');
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, [toast]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className='flex flex-col items-center justify-center w-full gap-4'>
			<div className='rounded-full size-40 bg-zinc-100' />
			<div className='space-y-1'>
				<h1 className='text-2xl font-bold'>{profile.name}</h1>
				<p className='text-muted-foreground'>{profile.email}</p>
			</div>
		</div>
	);
};

export default ProfilePage;
