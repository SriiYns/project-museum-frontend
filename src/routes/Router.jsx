import {
	AddCollection,
	EditCollection,
	TableCollection,
} from '@/pages/admin/collections';
import { AddUser, EditUser, TableUser } from '@/pages/admin/users';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DetailCollection, ListCollection } from '@/pages/user/collections';

import AboutPage from '@/pages/user/AboutPage';
import AdminLayout from '@/layouts/AdminLayout';
import ContactPage from '@/pages/user/ContactPage';
import DashboardPage from '@/pages/admin/Dashboard';
import HomePage from '@/pages/user/HomePage';
import KunjunganPage from '@/pages/user/KunjunganPage';
import LoginPage from '@/pages/auth/Login';
import ProfilePage from '@/pages/admin/Profile';
import TestPage from '@/pages/admin/Upload';
import UserLayout from '@/layouts/UserLayout';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<UserLayout />}>
					<Route index element={<Navigate to='/home' />} />
					<Route path='home' element={<HomePage />} />
					<Route path='test' element={<TestPage />} />
					<Route path='about' element={<AboutPage />} />
					<Route path='visit' element={<KunjunganPage />} />
					<Route path='contact' element={<ContactPage />} />

					<Route path='collection'>
						<Route index element={<ListCollection />} />
						<Route path=':id' element={<DetailCollection />} />
					</Route>
				</Route>

				<Route path='/auth'>
					<Route path='login' element={<LoginPage />} />
				</Route>

				<Route path='/admin' element={<AdminLayout />}>
					<Route index element={<Navigate to='/admin/dashboard' />} />
					<Route path='dashboard' element={<DashboardPage />} />
					<Route path='profile' element={<ProfilePage />} />

					<Route path='collection'>
						<Route index element={<TableCollection />} />
						<Route path='create' element={<AddCollection />} />
						<Route path=':id' element={<EditCollection />} />
					</Route>

					<Route path='user'>
						<Route index element={<TableUser />} />
						<Route path='create' element={<AddUser />} />
						<Route path=':id' element={<EditUser />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
