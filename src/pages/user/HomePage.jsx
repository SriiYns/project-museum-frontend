import Carousel from '../../components/Carousel';
import ImageSlider from '../../components/ImageSlider';
import { Link } from 'react-router-dom';
import img3 from '@/assets/img/img3.jpg';
import useCollection from '@/hooks/useCollection';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
	const { t } = useTranslation();
	const { collections, loading } = useCollection();

	return (
		<div className='flex flex-col justify-center min-h-screen pt-20'>
			<ImageSlider />

			<div className='py-10 w-content'>
				<h1 className='py-3 text-2xl font-bold'>
					{t('home.greeting')}
				</h1>

				<p className='leading-relaxed text-justify'>
					{t('home.welcome')}
				</p>
				<br />
				<p className='leading-relaxed text-justify'>
					{t('home.paragraph1')}
				</p>
			</div>

			<div className='relative w-full'>
				<div className='absolute z-10 w-full h-full'>
					<div className='flex flex-col justify-center h-full w-content'>
						<h1 className='mb-3 text-4xl font-bold text-white'>
							{t('home.heading1')}
						</h1>
						<p className='mb-5 leading-relaxed text-white'>
							{t('home.paragraph2')}
						</p>
						<div>
							<Link
								to='/collection'
								className='px-5 py-3 my-5 text-white border border-white'>
								{t('home.explore')}
							</Link>
						</div>
					</div>
				</div>

				<img
					src={img3}
					alt='background image'
					className='w-full h-full lg:max-h-[500px] bg-cover filter grayscale-[80%] object-cover'
				/>
			</div>

			<div className='p-10 w-content'>
				{loading ? (
					<p>{t('loading')}</p>
				) : (
					<Carousel items={collections} />
				)}
			</div>
		</div>
	);
};

export default HomePage;
