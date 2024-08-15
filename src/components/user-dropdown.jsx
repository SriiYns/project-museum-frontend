import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from './ui/button';
import { CircleUser } from 'lucide-react';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { useNavigate } from 'react-router-dom';

const UserDropdown = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/auth/login');
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='secondary'
					size='icon'
					className='rounded-full'>
					<CircleUser className='w-5 h-5' />
					<span className='sr-only'>Toggle user menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel className='p-2 text-sm font-medium'>
					User Account
				</DropdownMenuLabel>
				<DropdownMenuItem onClick={() => navigate('/admin/profile')}>
					Profile
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleLogout}>
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserDropdown;
