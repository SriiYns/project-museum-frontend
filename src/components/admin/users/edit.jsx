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
import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const userSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	password: z
		.string()
		.min(6, 'Password should be at least 6 characters long'),
});

const EditUserForm = ({ user }) => {
	const { toast } = useToast();
	const navigate = useNavigate();

	const form = useForm({
		resolver: zodResolver(userSchema),
		defaultValues: {
			name: user.name || '',
			email: user.email || '',
			password: '', // Leave password blank for security reasons
		},
	});

	const onSubmit = async (formData) => {
		try {
			toast({
				title: 'Loading',
				description: 'Updating user...',
				variant: 'subtle',
			});

			const { data } = await axios.put('users/' + user._id, formData);

			toast({
				title: 'Success',
				description: data?.message || 'User updated successfully',
				variant: 'success',
			});

			navigate('/admin/user');
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

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<Card>
					<CardHeader>
						<CardTitle>Detail Pengguna</CardTitle>
						<CardDescription>
							Detail Pengguna yang akan diubah.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='grid gap-4 lg:grid-cols-2'>
							<div className='col-span-full'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input
													placeholder='Name'
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
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													type='email'
													placeholder='Email'
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
						</div>
					</CardContent>
				</Card>
				<div className='flex items-center mt-4 space-x-4'>
					<Button type='submit'>Save</Button>
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

EditUserForm.propTypes = {
	user: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		createdAt: PropTypes.string,
	}),
};

export default EditUserForm;
