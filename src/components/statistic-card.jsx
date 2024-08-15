import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { BarChart } from 'lucide-react';
import PropTypes from 'prop-types';

const StatisticCard = ({ data }) => {
	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
				<CardTitle className='text-sm font-medium'>
					{data.title}
				</CardTitle>
				<BarChart className='size-5 text-primary' />
			</CardHeader>

			<CardContent>
				<div className='mb-4 text-3xl font-bold'>{data.value}</div>
				<p className='text-xs text-muted-foreground'>
					{data.description}
				</p>
			</CardContent>
		</Card>
	);
};

StatisticCard.propTypes = {
	data: PropTypes.shape({
		title: PropTypes.string.isRequired,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		description: PropTypes.string,
	}),
};

export default StatisticCard;
