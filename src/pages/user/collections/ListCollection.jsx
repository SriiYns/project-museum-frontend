import CardCollection from '@/components/user/collections/card';
import useCollection from '@/hooks/useCollection';
import { useTranslation } from 'react-i18next';

const ListCollection = () => {
	const { t } = useTranslation();
	const { loading, collections } = useCollection();

	if (loading) return <p>{t('loading')}</p>;

	return (
		<div className='flex justify-center min-h-screen pt-20'>
			<div className='p-20 w-content'>
				<h1 className='pb-10 text-3xl font-bold text-center'>
					{t('collection.title')}
				</h1>

				<div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
					{collections.map((collection) => (
						<CardCollection
							key={collection._id}
							collection={collection}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ListCollection;
