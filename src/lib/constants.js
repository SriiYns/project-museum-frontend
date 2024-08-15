import { Home, Package, User } from 'lucide-react';

export const API_URL = import.meta.env.VITE_API_URL;

export const ROUTES = {
	user: [
		{ path: '/home', label: 'menu.home' },
		{ path: '/about', label: 'menu.about' },
		{ path: '/visit', label: 'menu.visit' },
		{ path: '/contact', label: 'menu.contact' },
		{ path: '/collection', label: 'menu.collection' },
	],
	admin: [
		{ path: '/admin/dashboard', label: 'menu.dashboard', icon: Home },
		{ path: '/admin/collection', label: 'menu.collection', icon: Package },
		{ path: '/admin/user', label: 'User', icon: User },
	],
};

export const LANGUAGES = [
	{ id: 'id', label: 'Indonesia' },
	{ id: 'en', label: 'English' },
	{ id: 'sasak', label: 'Sasak' },
];
