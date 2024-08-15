import * as React from 'react';

import { Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import LanguageSelector from '@/components/language-selector';
import { Link } from 'react-router-dom';
import Logo from '@/components/logo';
import { ROUTES } from '@/lib/constants';
import ScanModal from '@/components/scanner';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = React.useState(false);
	const [isScanOpen, setIsScanOpen] = React.useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const toggleScan = () => {
		setIsScanOpen(!isScanOpen);
	};

	return (
		<nav className='relative'>
			<div className='fixed top-0 left-0 z-40 flex flex-row items-center justify-between w-full px-10 py-2 bg-white border-b lg:flex-row border-slate-200'>
				<Logo />
				<div className='items-center hidden space-x-10 text-sm font-semibold lg:flex'>
					{ROUTES.user.map((route) => (
						<Link
							key={route.path}
							to={route.path}
							className='whitespace-nowrap'>
							{t(route.label)}
						</Link>
					))}
					<Button onClick={toggleScan} variant='default' size='sm'>
						Scan
					</Button>
					<LanguageSelector />
				</div>

				<div className='flex items-center space-x-4 lg:hidden'>
					<Button onClick={toggleScan} variant='default' size='sm'>
						Scan
					</Button>
					<LanguageSelector />
					<Button onClick={toggleMenu} variant='default' size='icon'>
						{isOpen ? (
							<X className='size-5' />
						) : (
							<Menu className='size-5' />
						)}
					</Button>
				</div>

				<div
					className={cn(
						'absolute top-14 bg-white w-full left-0 px-5 lg:hidden',
						isOpen ? 'flex flex-wrap' : 'hidden'
					)}>
					{ROUTES.user.map((route) => (
						<Link
							className='block w-full py-5'
							key={route.path}
							to={route.path}
							onClick={toggleMenu}>
							{t(route.label)}
						</Link>
					))}
					<Button
						onClick={toggleScan}
						variant='default'
						size='sm'
						className='w-full py-5'>
						Scan
					</Button>
				</div>
			</div>

			<ScanModal isOpen={isScanOpen} onClose={toggleScan} />
		</nav>
	);
};

export default Navbar;
