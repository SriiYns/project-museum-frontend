import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

import { Link } from 'react-router-dom';
import Logo from '@/components/logo';
import { ROUTES } from '@/lib/constants';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
	const { t } = useTranslation();

	return (
		<aside className='flex-col flex-none hidden w-20 h-full border-r lg:flex bg-background'>
			<nav className='fixed flex flex-col items-center gap-4 px-2 py-4 '>
				<Logo />
				{ROUTES.admin.map((route) => {
					const Icon = route.icon;
					return (
						<Tooltip key={route.path}>
							<TooltipTrigger asChild>
								<Link
									to={route.path}
									className='flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground'>
									<Icon className='w-5 h-5' />
									<span className='sr-only'>
										{t(route.label)}
									</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side='right'>
								{t(route.label)}
							</TooltipContent>
						</Tooltip>
					);
				})}
			</nav>
		</aside>
	);
};

export default Sidebar;
