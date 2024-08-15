import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import Logo from '../logo';
import { PanelLeft } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import UserDropdown from '../user-dropdown';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
	const { t } = useTranslation();

	return (
		<nav className='sticky top-0 z-30 flex items-center justify-between h-16 gap-4 py-3 border-b lg:static lg:justify-end bg-background lg:border-0 lg:bg-transparent w-content'>
			<Sheet>
				<SheetTrigger asChild>
					<Button size='icon' variant='outline' className='lg:hidden'>
						<PanelLeft className='w-5 h-5' />
						<span className='sr-only'>Toggle Menu</span>
					</Button>
				</SheetTrigger>

				<SheetContent side='left' className='lg:max-w-xs'>
					<nav className='grid gap-6 text-lg font-medium'>
						<Logo />
						{ROUTES.admin.map((route) => (
							<Link
								key={route.path}
								to={route.path}
								className='flex items-center gap-2 font-semibold whitespace-nowrap'>
								{t(route.label)}
							</Link>
						))}
					</nav>
				</SheetContent>
			</Sheet>

			<UserDropdown />
		</nav>
	);
};

export default Navbar;
