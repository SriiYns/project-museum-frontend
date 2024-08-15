import CreateCollectionForm from '@/components/admin/collections/create';
import Header from '@/components/header';

const AddCollection = () => {
	return (
		<div className='space-y-8'>
			<Header
				title='Tambah Koleksi'
				description='Tambah data informasi Koleksi yang ada pada Museum Nusa Tenggara Barat.'
			/>

			<CreateCollectionForm />
		</div>
	);
};

export default AddCollection;
