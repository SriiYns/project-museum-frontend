import CreateUserForm from '@/components/admin/users/create';
import Header from '@/components/header';

const AddUser = () => {
	return (
		<div className='space-y-8'>
			<Header
				title='Tambah Pengguna'
				description='Tambah data informasi Pengguna yang ada pada Museum Nusa Tenggara Barat.'
			/>

			<CreateUserForm />
		</div>
	);
};

export default AddUser;
