import * as React from 'react';

import { Input } from '@/components/ui/input';
import PropTypes from 'prop-types';
import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useToast } from './ui/use-toast';
import { Progress } from './ui/progress';
import cloudinary from '@/lib/cloudinary';
import { Check } from 'lucide-react';

const CloudinaryUpload = ({ accept, asset_folder, onChange }) => {
	const { toast } = useToast();
	const [progress, setProgress] = React.useState(0);
	const [signature, setSignature] = React.useState(null);

	React.useEffect(() => {
		const fetchSignature = async () => {
			try {
				const { data } = await axios.post('/uploads/cloudinary', {
					asset_folder,
				});
				setSignature(data);
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
			}
		};

		fetchSignature();
	}, [toast, asset_folder]);

	const handleFileUpload = async (e) => {
		e.preventDefault();
		setProgress(0);

		try {
			const formData = new FormData();
			formData.append('file', e.target.files[0]);
			formData.append('asset_folder', asset_folder);
			formData.append('api_key', signature.data.api_key);
			formData.append('timestamp', signature.data.timestamp);
			formData.append('signature', signature.data.signature);

			const { data } = await cloudinary.post(
				signature.data.cloud_name + '/auto/upload',
				formData,
				{
					onUploadProgress: (progressEvent) => {
						setProgress(
							Math.round(
								(progressEvent.loaded * 100) /
									progressEvent.total
							)
						);
					},
				}
			);

			onChange(data.secure_url);
			setProgress(100);
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
			setProgress(0);
			console.log(error);
		}
	};

	return (
		<div className='space-y-2'>
			<Input type='file' accept={accept} onChange={handleFileUpload} />
			{progress > 0 && progress < 100 && (
				<Progress value={progress} className='h-2' />
			)}
			{progress === 100 && (
				<div className='text-xs text-primary'>
					<Check className='inline-block mr-1 size-3' />
					Upload complete!
				</div>
			)}
		</div>
	);
};

CloudinaryUpload.propTypes = {
	accept: PropTypes.string.isRequired,
	asset_folder: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default CloudinaryUpload;
