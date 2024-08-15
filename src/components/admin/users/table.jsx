import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import PropTypes from 'prop-types';

const UserTable = ({ users, handleDelete }) => {
	const navigate = useNavigate();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Users</CardTitle>
				<CardDescription>Manage your users here</CardDescription>
			</CardHeader>

			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-60'>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.map((user) => (
							<TableRow key={user._id} className='bg-white'>
								<TableCell className='font-medium'>
									<Link to={`/admin/user/${user._id}`}>
										{user.name}
									</Link>
								</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												aria-haspopup='true'
												size='icon'
												variant='ghost'>
												<MoreHorizontal className='w-4 h-4' />
												<span className='sr-only'>
													Toggle menu
												</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align='end'>
											<DropdownMenuLabel>
												Actions
											</DropdownMenuLabel>
											<DropdownMenuItem
												onClick={() =>
													navigate(
														'/admin/user/' +
															user._id
													)
												}>
												Edit
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() =>
													handleDelete(user._id)
												}>
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

UserTable.propTypes = {
	users: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			email: PropTypes.string.isRequired,
			createdAt: PropTypes.string,
		})
	),
	handleDelete: PropTypes.func,
	handleUpdate: PropTypes.func,
};

export default UserTable;
