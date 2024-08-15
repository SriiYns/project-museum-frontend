import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Museum from '@/assets/img/museum.jpg';
import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const authSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

const LoginPage = () => {
	const { toast } = useToast();
	const navigate = useNavigate();

	const form = useForm({
		resolver: zodResolver(authSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (formData) => {
		try {
			toast({
				title: 'Loading',
				description: 'Authenticating user...',
				variant: 'default',
			});

			const { data } = await axios.post('users/login', formData);
			localStorage.setItem('token', data.token);

			toast({
				title: 'Login successfully',
				description: 'You have successfully logged in',
				status: 'success',
			});

			navigate('/admin');
		} catch (err) {
			if (isAxiosError(err)) {
				toast({
					title: 'Login failed',
					description: err.response?.data?.message,
					status: 'error',
				});
			} else {
				toast({
					title: 'Login failed',
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
			<div className='hidden bg-muted lg:block'>
				<img
					src={Museum}
					alt='Image'
					className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
				/>
			</div>
			<div className='flex items-center justify-center py-12'>
				<div className='mx-auto grid w-[350px] gap-6'>
					<div className='grid gap-2'>
						<h1 className='text-3xl font-bold'>Login</h1>
						<p className='text-muted-foreground'>
							Enter your email below to login to your account
						</p>
					</div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='grid gap-4'>
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
								Login
							</Button>
						</form>
					</Form>
					<div className='mt-4 text-sm'>
						Don&apos;t have an account?{' '}
						<Link to='/auth/register' className='underline'>
							Sign up
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
