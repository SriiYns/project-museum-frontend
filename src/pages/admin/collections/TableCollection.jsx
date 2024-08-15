import * as React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import CollectionTable from '@/components/admin/collections/table';
import Header from '@/components/header';
import StatisticCard from '@/components/statistic-card';
import useCollection from '@/hooks/useCollection';

const TableCollection = () => {
	const navigate = useNavigate();
	const { loading, error, collections, handleDelete } = useCollection();

	React.useEffect(() => {
		if (error) navigate('/admin/dashboard');
	}, [error, navigate]);

	const statistics = React.useMemo(() => {
		if (!collections) return [];
		return [
			{
				title: 'Total Koleksi',
				value: collections.length,
				description: 'Jumlah koleksi yang ada di museum',
			},
			{
				title: 'Total Kategori',
				value: new Set(
					collections.map((collection) => collection.kategori)
				).size,
				description: 'Jumlah kategori yang ada di museum',
			},
			{
				title: 'Tahun Pertama Koleksi',
				value: Math.min(
					...collections.map((collection) => collection.tahun)
				),
				description: 'Tahun pertama koleksi yang ada di museum',
			},
			{
				title: 'Tahun Terakhir Koleksi',
				value: Math.max(
					...collections.map((collection) => collection.tahun)
				),
				description: 'Tahun terakhir koleksi yang ada di museum',
			},
		];
	}, [collections]);

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
					title='Table Koleksi'
					description='Table data informasi Koleksi yang ada pada Museum Nusa Tenggara Barat.'
				/>

				<div>
					<Link to='/admin/collection/create'>
						<Button>Tambah Koleksi</Button>
					</Link>
				</div>
			</div>

			<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
				{statistics.map((statistic, index) => (
					<StatisticCard key={index} data={statistic} />
				))}
			</div>

			<CollectionTable
				collections={collections}
				handleDelete={handleDelete}
			/>
		</div>
	);
};

export default TableCollection;
