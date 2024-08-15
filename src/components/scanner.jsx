import PropTypes from 'prop-types';
import QrScanner from 'react-qr-scanner';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScanModal = ({ isOpen, onClose }) => {
	const navigate = useNavigate();

	const handleScan = (data) => {
		if (data) {
			navigate(`/collection/${data.text}`);
			onClose();
		}
	};

	const handleError = (err) => {
		console.error(err);
	};

	return isOpen ? (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='relative w-full max-w-md p-6 bg-white rounded-md shadow-md'>
				<button
					className='absolute text-gray-500 top-2 right-2 hover:text-gray-700'
					onClick={onClose}>
					<X className='size-5' />
				</button>
				<h2 className='mb-4 text-lg font-semibold'>Scan QR Code</h2>
				<QrScanner
					delay={300}
					onError={handleError}
					onScan={handleScan}
					className='object-cover w-full rounded-lg aspect-square'
				/>
			</div>
		</div>
	) : null;
};

ScanModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default ScanModal;
