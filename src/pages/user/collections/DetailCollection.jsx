import * as React from 'react';

import { Button } from '@/components/ui/button';
import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

const tabs = [
	{ id: 'summary', label: 'Summary' },
	{ id: 'referensi', label: 'References' },
];

const DetailCollection = () => {
	const { id } = useParams();
	const { toast } = useToast();
	const { t, i18n } = useTranslation();
	const [loading, setLoading] = React.useState(true);
	const [collection, setCollection] = React.useState(null);
	const [items, setItems] = React.useState([]);
	const audioRef = React.useRef(null);

	const [activeTab, setActiveTab] = React.useState(tabs.at(0).id);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(`collections/${id}`);
				setCollection(data.data);
				setItems(data.data.referensi);
			} catch (error) {
				if (isAxiosError(error)) {
					toast({
						title: 'Error',
						description: error.response?.data?.message,
						variant: 'destructive',
					});
				} else {
					toast({
						title: 'Error',
						description: error.message,
						variant: 'destructive',
					});
				}
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id, toast]);

	React.useEffect(() => {
		if (!audioRef.current) return;
		audioRef.current.load();
	}, [i18n.language]);

	const judul = React.useMemo(() => {
		if (!collection) return null;

		const mapper = {
			en: collection.judul_en,
			id: collection.judul_id,
			sasak: collection.judul_sasak,
		};

		return mapper[i18n.language];
	}, [i18n.language, collection]);

	const description = React.useMemo(() => {
		if (!collection) return null;

		const mapper = {
			en: collection.deskripsi_en,
			id: collection.deskripsi_id,
			sasak: collection.deskripsi_sasak,
		};

		return mapper[i18n.language];
	}, [i18n.language, collection]);

	const audio = React.useMemo(() => {
		if (!collection) return null;

		const mapper = {
			en: collection.audio_en,
			id: collection.audio_id,
			sasak: collection.audio_sasak,
		};

		return mapper[i18n.language];
	}, [collection, i18n.language]);

	if (loading) {
		return (
			<div className='flex justify-center min-h-screen pt-20'>
				{t('loading')}
			</div>
		);
	}

	return (
		<div className='pt-40 pb-20 space-y-10 w-content'>
			<nav>
				<ul className='flex items-center space-x-2 text-sm'>
					<li>{t('collection.title')}</li>
					<li>/</li>
					<li>{judul}</li>
				</ul>
			</nav>

			<h1 className='text-4xl font-bold'>{judul}</h1>

			<div className='grid gap-10 lg:grid-cols-2'>
				<div className='order-last space-y-10 lg:order-first'>
					<div className='leading-relaxed text-justify whitespace-pre-line'>
						{description}
					</div>

					<audio controls ref={audioRef} className='w-full'>
						<source src={audio} type='audio/mpeg' />
						Your browser does not support the audio element.
					</audio>
				</div>

				<div className='order-first space-y-10 lg:order-last'>
					<div className='w-full bg-zinc-100 aspect-square'>
						<img
							src={collection.image}
							alt={judul}
							className='object-cover w-full h-full'
						/>
					</div>
				</div>
			</div>

			<hr />

			<h3 className='py-5 text-2xl font-bold'>Collection Summary</h3>

			<div className='flex items-center space-x-2'>
				{tabs.map((tab) => (
					<Button
						key={tab.id}
						variant={activeTab === tab.id ? 'default' : 'outline'}
						onClick={() => setActiveTab(tab.id)}>
						{tab.label}
					</Button>
				))}
			</div>

			<div>
				{activeTab === 'summary' && (
					<table className='w-full text-sm border border-collapse table-auto border-zinc-200'>
						<tbody>
							<tr className='border-b border-zinc-200 [&>td]:p-2'>
								<td className='font-semibold'>
									{t('collection.title')}
								</td>
								<td>{judul}</td>
							</tr>
							<tr className='border-b border-zinc-200 [&>td]:p-2'>
								<td className='font-semibold'>
									{t('collection.category')}
								</td>
								<td>{collection.kategori}</td>
							</tr>
							<tr className='border-b border-zinc-200 [&>td]:p-2'>
								<td className='font-semibold'>
									{t('collection.year')}
								</td>
								<td>{collection.tahun}</td>
							</tr>
						</tbody>
					</table>
				)}

				{activeTab === 'referensi' && (
					<div>
						<p>{items ?? 'no referensi'}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default DetailCollection;
