import PropTypes from 'prop-types';
import QrScanner from 'react-qr-scanner';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScanModal = ({ isOpen, onClose }) => {
	const [isProcessing, setIsProcessing] = useState(false); // State to track processing
    const navigate = useNavigate();

	const handleScan = async (data) => {
		if (data && !isProcessing) {
			setIsProcessing(true); // Set processing to true to prevent multiple scans
	
			try {
				// Save scan data to the historyScanCollection table
				const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/historyScanCollection`, {
					collectionId: data.text,
				});
	
				// Extract the ID from the URL
				const cId = data.text;
				const regex = /\/collection\/([a-zA-Z0-9]+)/;
				const match = cId.match(regex);
				if (match && match[1]) {
					const extractedId = match[1];
					console.log('Scanned collection ID:', extractedId);
	
					navigate(`/collection/${extractedId}`);
				} else {
					console.error('Invalid collection ID format');
					// Optional: Display error message to user
				}
	
				onClose(); // Close the scanner/modal
			} catch (error) {
				console.error('Error saving scan data:', error);
				// Optional: Display error message to user
			} finally {
				setIsProcessing(false); // Reset processing flag after operation completes
			}
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
