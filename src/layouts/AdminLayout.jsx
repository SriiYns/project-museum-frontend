import * as React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import Navbar from '@/components/admin/Navbar';
import Sidebar from '@/components/admin/Sidebar';
import { jwtDecode } from 'jwt-decode';

const AdminLayout = () => {
	const [auth, setAuth] = React.useState(null);

	React.useEffect(() => {
		const autheticate = () => {
			const token = localStorage.getItem('token');

			if (!token) {
				setAuth(false);
				return;
			}

			const decodedToken = jwtDecode(token);
			if (decodedToken.exp && decodedToken.exp > Date.now() / 1000) {
				setAuth(true);
			} else {
				localStorage.removeItem('token');
				setAuth(false);
			}
		};

		autheticate();
	}, []);

	if (auth === null) return <div>Loading...</div>;

	return auth ? (
		<div className='relative flex flex-col w-full h-screen overflow-hidden lg:flex-row bg-muted/40'>
			<Sidebar />
			<div className='flex flex-col w-full gap-8 overflow-y-scroll'>
				<Navbar />
				<div className='pb-20 w-content'>
					<Outlet />
				</div>
			</div>
		</div>
	) : (
		<Navigate to='/auth/login' />
	);
};

export default AdminLayout;
