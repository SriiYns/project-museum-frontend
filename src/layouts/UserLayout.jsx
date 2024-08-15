import Footer from '@/components/user/Footer';
import Navbar from '@/components/user/Navbar';
import { Outlet } from 'react-router-dom';

export function UserLayout() {
	return (
		<>
			<Navbar />
			<div className='min-h-screen'>
				<Outlet />
			</div>
			<Footer />
		</>
	);
}

export default UserLayout;
