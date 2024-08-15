import { FaInstagram, FaFacebook, FaYoutube, FaTwitter } from 'react-icons/fa';
import logo from '@/assets/img/logo.png';
import logoNTB from '@/assets/img/logo-ntb.png';
import { useTranslation } from 'react-i18next';

const Footer = () => {
	const { t } = useTranslation();

	return (
		<footer className='text-white bg-black'>
			<div className='py-10 w-content'>
				<div className='flex items-start justify-start mb-5 space-x-8'>
					<img src={logo} alt='Logo' className='w-20 h-20' />
					<img src={logoNTB} alt='Logo' className='w-16' />
				</div>

				<div className='flex flex-col gap-10 lg:flex-row lg:justify-between'>
					<div className='w-full max-w-md'>
						<h3 className='text-2xl font-bold'>
							{t('menu.about')}
						</h3>
						<p>{t('footer.footer1')}</p>
					</div>

					<div className='w-full max-w-md'>
						<h3 className='text-2xl font-bold'>
							{t('footer.footer2')}
						</h3>

						<p className='leading-relaxed'>
							Alamat : Jalan Panji Tilar Negara 6, Mataram 83114{' '}
							<br />
							Email: museumntb@gmail.com
							<br />
							Telepon : +62 623 70637503
						</p>
						<div className='flex justify-start mt-5 space-x-10'>
							{/* Social media icons */}
							<FaInstagram className='text-xl text-white cursor-pointer' />
							<FaFacebook className='text-xl text-white cursor-pointer' />
							<FaYoutube className='text-xl text-white cursor-pointer' />
							<FaTwitter className='text-xl text-white cursor-pointer' />
						</div>
					</div>
				</div>
			</div>

			<div className='py-5 text-sm text-center w-content opacity-60'>
				<p>
					&copy; 2024 Museum Negeri Nusa Tenggara Barat. All Rights
					Reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
