import Header from '@/components/header';
import TicketForm from '@/components/admin/tickets/create';

const AddTicket = () => {
	return (
		<div className='space-y-8'>
			<Header
				title='Tambah Tiket'
				description='Tambah data Tiket kunjungan Museum Nusa Tenggara Barat.'
			/>

			<TicketForm />
		</div>
	);
};

export default AddTicket;
