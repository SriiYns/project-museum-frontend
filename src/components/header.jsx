import PropTypes from 'prop-types';

const Header = ({ title, description }) => {
	return (
		<div className='space-y-2'>
			<h1 className='text-3xl font-bold'>{title}</h1>
			<p className='text-muted-foreground'>{description}</p>
		</div>
	);
};

Header.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

export default Header;
