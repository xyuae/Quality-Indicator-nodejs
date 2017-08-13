import React from 'react';
import PropTypes from 'prop-types';
const Header = ({ Message }) => {
	return (
		<h2 className="Header text-center">
			{Message}
		</h2>
	);
};

Header.propTypes = {
	Message: PropTypes.string
};

export default Header;
