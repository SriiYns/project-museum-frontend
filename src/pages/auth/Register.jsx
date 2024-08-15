import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Museum from '@/assets/img/museum.jpg';
import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const authSchema = z.object({
	name: z.string().min(3).max(50),
	email: z.string().email(),
	password: z.string().min(8),
});

const RegisterPage = () => {
	const { toast } = useToast();
	const navigate = useNavigate();
	const form = useForm({
		resolver: zodResolver(authSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const onSubmit = async (formData) => {
		try {
			toast({
				title: 'Loading',
				description: 'Registering user...',
				variant: 'default',
			});

			await axios.post('users/register', formData);

			toast({
				title: 'Register successfully',
				description: 'You have successfully registered',
				status: 'success',
			});

			navigate('/auth/login');
		} catch (err) {
			if (isAxiosError(err)) {
				toast({
					title: 'Register failed',
					description: err.response?.data?.message,
					status: 'error',
				});
			} else {
				toast({
					title: 'Register failed',
					description: 'Something went wrong',
					status: 'error',
				});
			}
			console.log(err);
		}
	};

	if (localStorage.getItem('token')) {
		return <Navigate to='/admin' />;
	}

	return (
		<div className='w-full h-screen lg:grid lg:grid-cols-2'>
			<div className='flex items-center justify-center py-12'>
				<div className='mx-auto grid w-[350px] gap-6'>
					<div className='grid gap-2'>
						<h1 className='text-3xl font-bold'>Register</h1>
						<p className='text-muted-foreground'>
							Register your account below to login to your account
						</p>
					</div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='grid gap-4'>
							<div className='grid gap-2'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nama Lengkap</FormLabel>
											<FormControl>
												<Input
													placeholder='Nama Lengkap'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='grid gap-2'>
								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													placeholder='Email'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='grid gap-2'>
								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													type='password'
													placeholder='Password'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<Button type='submit' className='w-full'>
								Register
							</Button>
						</form>
					</Form>

					<div className='mt-4 text-sm'>
						Already have an account?{' '}
						<Link to='/auth/login' className='underline'>
							Sign in
						</Link>
					</div>
				</div>
			</div>
			<div className='hidden bg-muted lg:block'>
				<img
					src={Museum}
					alt='Image'
					className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
				/>
			</div>
		</div>
	);
};

export default RegisterPage;
