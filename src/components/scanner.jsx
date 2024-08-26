import PropTypes from 'prop-types';
import QrScanner from 'react-qr-scanner';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '@/lib/axios';

const ScanModal = ({ isOpen, onClose }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const handleScan = async (data) => {
        // Log data yang dipindai untuk debugging
        console.log('Scanned data:', data);

        if (!data) {
            console.warn('No data scanned');
            return;
        }

        if (data && !isProcessing) {
            setIsProcessing(true);

            try {
                const collectionId = data.text;
                console.log('Scanned collection ID:', collectionId);

                // Mengirim request ke backend
                const response = await axios.post('/historyScanCollection', {
                    collectionId,
                });

                // Memverifikasi response dari backend
                if (response.status === 200) {
                    navigate(`/collection/${collectionId}`);
                    onClose(); // Tutup modal setelah berhasil scan
                } else {
                    console.error('Failed to save scan data, server returned status:', response.status);
                    // Tampilkan pesan kesalahan jika diperlukan
                }
            } catch (error) {
                console.error('Error saving scan data:', error);
                // Tampilkan pesan kesalahan jika diperlukan
            } finally {
                setIsProcessing(false);
            }
        }
    };

    const handleError = (err) => {
        console.error('QR Scan error:', err);
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
