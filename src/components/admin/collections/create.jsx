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

	image: z.string().url(),
	audio_id: z.string().url(),
	audio_en: z.string().url(),
	audio_sasak: z.string().url(),
});

const CreateCollectionForm = () => {
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

	const onSubmit = async (formData) => {
		try {
			toast({
				title: 'Loading',
				description: 'Creating collection...',
				variant: 'default',
			});

			const { data } = await axios.post('collections', formData);

			toast({
				title: 'Success',
				description: data?.message || 'Data submitted successfully',
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

export default CreateCollectionForm;
