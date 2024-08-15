import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const CardCollection = ({ collection }) => {
	const { i18n } = useTranslation();

	const judul = React.useMemo(() => {
		if (!collection) return null;

		const mapper = {
			en: collection.judul_en,
			id: collection.judul_id,
			sasak: collection.judul_sasak,
		};

		return mapper[i18n.language];
	}, [i18n.language, collection]);

	return (
		<Link
			to={'/collection/' + collection._id}
			className='relative flex items-center overflow-hidden group aspect-square '>
			<div className='absolute z-20 flex flex-col justify-end w-full h-full p-6 space-y-4 text-white transition-all duration-500 ease-in-out group-hover:text-primary'>
				<div>
					<Badge>{collection.kategori}</Badge>
				</div>
				<h2 className='text-2xl font-bold '>{judul}</h2>
				<h3 className='font-bold'>{collection.tahun}</h3>
			</div>

			<div className='w-full bg-zinc-100 aspect-square'>
				<img
					src={collection.image}
					alt={judul}
					className='object-cover w-full h-full'
				/>
			</div>

			<div className='absolute bottom-0 w-full h-full bg-gradient-to-t from-zinc-900 to-transparent to-60%' />
			<div className='absolute bottom-0 z-10 w-full h-full transition-transform duration-300 ease-in-out transform translate-y-full bg-white group-hover:translate-y-0' />
		</Link>
	);
};

CardCollection.propTypes = {
	collection: PropTypes.shape({
		_id: PropTypes.string.isRequired,

		judul_id: PropTypes.string,
		judul_en: PropTypes.string,
		judul_sasak: PropTypes.string,

		description: PropTypes.string,
		tahun: PropTypes.number,
		kategori: PropTypes.string,
		tag: PropTypes.arrayOf(PropTypes.string),
		referensi: PropTypes.string.isRequired,

		image: PropTypes.string,

		deskripsi_en: PropTypes.string,
		deskripsi_id: PropTypes.string,
		deskripsi_sasak: PropTypes.string,

		audio_id: PropTypes.string,
		audio_en: PropTypes.string,
		audio_sasak: PropTypes.string,

		createdAt: PropTypes.string,
		updatedAt: PropTypes.string,
	}),
};

export default CardCollection;
