import * as React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import Receipt from '@/components/admin/tickets/receipt';
import StatisticCard from '@/components/statistic-card';
import TicketTable from '@/components/admin/tickets/table';
import { formatCurrency } from '@/lib/utils';
import useTicket from '@/hooks/useTicket';

const TableTicket = () => {
	const navigate = useNavigate();
	const ref = React.useRef(null);
	const { loading, error, tickets, handleDelete } = useTicket();

	React.useEffect(() => {
		if (error) navigate('/admin/dashboard');
	}, [error, navigate]);

	const [index, setIndex] = React.useState(0);
	const ticket = tickets && tickets.at(index);

	const handleNext = () => {
		setIndex((index + 1) % tickets.length);
	};

	const handlePrev = () => {
		setIndex((index - 1 + tickets.length) % tickets.length);
	};

	const handleClick = (id) => {
		setIndex(tickets.findIndex((ticket) => ticket._id === id));
	};

	const statistics = React.useMemo(() => {
		if (!tickets) return [];

		return [
			{
				title: 'Total Penjualan',
				value: formatCurrency(
					tickets.reduce((acc, ticket) => acc + ticket.amount, 0)
				),
				description: 'Jumlah penjualan tiket yang telah dikirim',
			},
			{
				title: 'Jumlah Tiket Terjual',
				value: tickets.reduce((acc, ticket) => acc + ticket.count, 0),
				description: 'Jumlah tiket yang telah dikirim',
			},
			{
				title: 'Jumlah Transaksi',
				value: tickets.length,
				description: 'Jumlah transaksi yang telah dilakukan',
			},
			{
				title: 'Jumlah Pengguna',
				value: new Set(tickets.map((ticket) => ticket.email)).size,
				description: 'Jumlah pengguna yang telah terdaftar',
			},
		];
	}, [tickets]);

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
					title='Table Tiket'
					description='Table data Tiket kunjungan Museum Nusa Tenggara Barat.'
				/>

				<div>
					<Link to='/admin/ticket/create'>
						<Button>Tambah Tiket</Button>
					</Link>
				</div>
			</div>

			<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
				{statistics.map((statistic, index) => (
					<StatisticCard key={index} data={statistic} />
				))}
			</div>

			<TicketTable
				tickets={tickets}
				handleDelete={handleDelete}
				handleClick={handleClick}
			/>
			<Receipt
				ticket={ticket}
				ref={ref}
				handleNext={handleNext}
				handlePrev={handlePrev}
				handleDelete={handleDelete}
			/>
		</div>
	);
};

export default TableTicket;
