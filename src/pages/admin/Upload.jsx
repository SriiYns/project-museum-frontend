import * as React from 'react';

import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';

const asset_folder = 'test';
const public_id = 'image';

const TestPage = () => {
	const { toast } = useToast();
	const fileRef = React.useRef(null);
	const [progress, setProgress] = React.useState(0);
	const [signature, setSignature] = React.useState(null);

	React.useEffect(() => {
		const fetchSignature = async () => {
			try {
				const { data } = await axios.post('/uploads/cloudinary', {
					asset_folder,
					public_id,
				});

				setSignature(data);
			} catch (error) {
				if (isAxiosError(error)) {
					toast(error.response.data.message);
					console.log(error.response.data);
				}
				console.log(error);
			}
		};

		fetchSignature();
	}, [toast]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const formData = new FormData();
			formData.append('file', fileRef.current.files[0]);
			formData.append('api_key', signature.data.api_key);
			formData.append('timestamp', signature.data.timestamp);
			formData.append('signature', signature.data.signature);
			formData.append('asset_folder', asset_folder);
			formData.append('public_id', public_id);
			formData.append('overwrite', true);
			formData.append('use_asset_folder_as_public_id_prefix', true);

			const { data } = await axios.post(
				`https://api.cloudinary.com/v1_1/${signature.data.cloud_name}/auto/upload`,
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

			console.log(data);
		} catch (error) {
			if (isAxiosError(error)) {
				toast(error.response.data.message);
				console.log(error.response.data);
			}
			console.log(error);
		}
	};

	return (
		<div className='pt-20 w-content'>
			<form encType='multipart/form-data' onSubmit={handleSubmit}>
				<input type='file' ref={fileRef} />
				<progress value={progress} max={100} />
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default TestPage;
