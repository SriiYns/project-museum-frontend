import * as React from 'react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PropTypes from 'prop-types';
import { Textarea } from '@/components/ui/textarea';
import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CloudinaryUpload from '@/components/CloudinaryUpload';

const collectionSchema = z.object({
	judul_id: z.string().min(6),
	judul_en: z.string().min(6),
	judul_sasak: z.string().min(6),

	tag: z.string().min(4),
	kategori: z.string().min(4),
	tahun: z.coerce.number().min(1900).max(new Date().getFullYear()),
	referensi: z.string().min(4),

	deskripsi_en: z.string().min(20),
	deskripsi_id: z.string().min(20),
	deskripsi_sasak: z.string().min(20),

	image: z.union([z.string().url().nullish(), z.literal('')]),
	audio_id: z.union([z.string().url().nullish(), z.literal('')]),
	audio_en: z.union([z.string().url().nullish(), z.literal('')]),
	audio_sasak: z.union([z.string().url().nullish(), z.literal('')]),
});

const EditCollectionForm = ({ collection }) => {
	const { toast } = useToast();
	const navigate = useNavigate();

	const form = useForm({
		resolver: zodResolver(collectionSchema),
		defaultValues: {
			judul_id: '',
			judul_en: '',
			judul_sasak: '',

			tag: '',
			kategori: '',
			tahun: new Date().getFullYear(),
			referensi: '',

			deskripsi_en: '',
			deskripsi_id: '',
			deskripsi_sasak: '',

			image: '',
			audio_id: '',
			audio_en: '',
			audio_sasak: '',
		},
	});

	React.useEffect(() => {
		if (collection) {
			form.setValue('judul_id', collection.judul_id);
			form.setValue('judul_en', collection.judul_en);
			form.setValue('judul_sasak', collection.judul_sasak);

			form.setValue('tag', String(collection.tag));
			form.setValue('kategori', collection.kategori);
			form.setValue('tahun', collection.tahun);
			form.setValue('referensi', collection.referensi);

			form.setValue('deskripsi_en', collection.deskripsi_en);
			form.setValue('deskripsi_id', collection.deskripsi_id);
			form.setValue('deskripsi_sasak', collection.deskripsi_sasak);

			form.setValue('image', collection.image);
			form.setValue('audio_id', collection.audio_id);
			form.setValue('audio_en', collection.audio_en);
			form.setValue('audio_sasak', collection.audio_sasak);
		}
	}, [collection, form, navigate]);

	const onSubmit = async (formData) => {
		try {
			toast({
				title: 'Loading',
				description: 'Updating collection...',
				variant: 'subtle',
			});

			const { data } = await axios.put(
				'collections/' + collection._id,
				formData
			);

			toast({
				title: 'Success',
				description: data?.message || 'Collection updated succesfully',
				variant: 'success',
			});

			navigate('/admin/collection');
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
			console.log(error);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='grid items-start gap-8 mb-8 lg:grid-cols-5'>
					<Card className='lg:col-span-3'>
						<CardHeader>
							<CardTitle>Detail Koleksi</CardTitle>
							<CardDescription>
								Detail Koleksi yang akan dibuat.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='grid gap-4 lg:grid-cols-2'>
								<div className='col-span-full'>
									<FormField
										control={form.control}
										name='judul_id'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Judul dalam Bahasa Indonesia
												</FormLabel>
												<FormControl>
													<Input
														placeholder='Judul Koleksi'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className='col-span-full'>
									<FormField
										control={form.control}
										name='judul_en'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Judul dalam Bahasa Inggris
												</FormLabel>
												<FormControl>
													<Input
														placeholder='Judul Koleksi'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className='col-span-full'>
									<FormField
										control={form.control}
										name='judul_sasak'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Judul dalam Bahasa Sasak
												</FormLabel>
												<FormControl>
													<Input
														placeholder='Judul Koleksi'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div>
									<FormField
										control={form.control}
										name='tahun'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Tahun</FormLabel>
												<FormControl>
													<Input
														type='number'
														placeholder='Tahun'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div>
									<FormField
										control={form.control}
										name='tag'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Tag</FormLabel>
												<FormControl>
													<Input
														placeholder='Tag'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className='col-span-full'>
									<FormField
										control={form.control}
										name='kategori'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Kategori</FormLabel>
												<FormControl>
													<Input
														placeholder='Kategori'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className='col-span-full'>
									<FormField
										control={form.control}
										name='deskripsi_id'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Deskripsi dalam Bahasa
													Indonesia
												</FormLabel>
												<FormControl>
													<Textarea
														placeholder='Deskripsi Koleksi'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className='col-span-full'>
									<FormField
										control={form.control}
										name='deskripsi_en'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Deskripsi dalam Bahasa
													Inggris
												</FormLabel>
												<FormControl>
													<Textarea
														placeholder='Deskripsi Koleksi'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className='col-span-full'>
									<FormField
										control={form.control}
										name='deskripsi_sasak'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Deskripsi dalam Bahasa Sasak
												</FormLabel>
												<FormControl>
													<Textarea
														placeholder='Deskripsi Koleksi'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className='col-span-full'>
									<FormField
										control={form.control}
										name='referensi'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													References
												</FormLabel>
												<FormControl>
													<Textarea
														placeholder='Referensi'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className='lg:col-span-2'>
						<CardHeader>
							<CardTitle>File Koleksi</CardTitle>
							<CardDescription>
								File Koleksi yang akan dibuat.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='grid gap-4'>
								<FormField
									control={form.control}
									name='image'
									render={({ field: { onChange } }) => (
										<FormItem>
											<FormLabel>
												Gambar Koleksi
											</FormLabel>
											<FormControl>
												<CloudinaryUpload
													accept='image/*'
													asset_folder='collections'
													onChange={onChange}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='audio_id'
									render={({ field: { onChange } }) => (
										<FormItem>
											<FormLabel>
												Audio dalam Bahasa Indonesia
											</FormLabel>
											<FormControl>
												<CloudinaryUpload
													accept='audio/*'
													asset_folder='collections'
													onChange={onChange}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='audio_en'
									render={({ field: { onChange } }) => (
										<FormItem>
											<FormLabel>
												Audio dalam Bahasa Inggris
											</FormLabel>
											<FormControl>
												<CloudinaryUpload
													accept='audio/*'
													asset_folder='collections'
													onChange={onChange}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='audio_sasak'
									render={({ field: { onChange } }) => (
										<FormItem>
											<FormLabel>
												Audio dalam Bahasa Sasak
											</FormLabel>
											<FormControl>
												<CloudinaryUpload
													accept='audio/*'
													asset_folder='collections'
													onChange={onChange}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className='flex items-center space-x-4'>
					<Button type='submit'>Submit</Button>
					<Button
						type='reset'
						onClick={() => form.reset()}
						variant='outline'>
						Reset
					</Button>
				</div>
			</form>
		</Form>
	);
};

EditCollectionForm.propTypes = {
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

export default EditCollectionForm;
