import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { LANGUAGES } from '@/lib/constants';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
	const { i18n } = useTranslation();
	const active = LANGUAGES.find((lang) => lang.id === i18n.language);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>
					<Languages className='mr-2 size-5' />
					<span>{active.label}</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align='end' className='z-50'>
				{LANGUAGES.map((lang) => (
					<DropdownMenuItem
						key={lang.id}
						onClick={() => i18n.changeLanguage(lang.id)}>
						{lang.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LanguageSelector;
