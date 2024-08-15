import * as React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import StatisticCard from '@/components/statistic-card';
import UserTable from '@/components/admin/users/table'; // Make sure this component is adapted for users
import useUser from '@/hooks/useUser'; // Import the useUser hook

const TableUser = () => {
	const navigate = useNavigate();
	const { loading, error, users, handleDelete, handleUpdate } = useUser();

	React.useEffect(() => {
		if (error) navigate('/admin/dashboard');
	}, [error, navigate]);

	const statistics = React.useMemo(() => {
		if (!users) return [];
		return [
			{
				title: 'Total User',
				value: users.length,
				description: 'Jumlah total user yang terdaftar',
			},
		];
	}, [users]);

	if (loading) {
		return (
			<div className='flex justify-center min-h-screen pt-20'>
				Loading...
			</div>
		);
	}

	return (
		<div className='space-y-8'>
			<div className='flex items-center justify-between'>
				<Header
					title='Table Pengguna'
					description='Table data Tiket kunjungan Museum Nusa Tenggara Barat.'
				/>

				<div>
					<Link to='/admin/user/create'>
						<Button>Tambah Pengguna</Button>
					</Link>
				</div>
			</div>

			<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
				{statistics.map((statistic, index) => (
					<StatisticCard key={index} data={statistic} />
				))}
			</div>

			<UserTable
				users={users}
				handleDelete={handleDelete}
				handleUpdate={handleUpdate} // Include handleUpdate if needed
			/>
		</div>
	);
};

export default TableUser;
