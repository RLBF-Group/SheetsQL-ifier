import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className="footer">
			{/* //! ensure that this route is consistent with the user's logged in status */}
			<Link to="/form" className="linkToReadMe">
				HOME
			</Link>
			<Link to="/readme" className="linkToReadMe">
				READ ME
			</Link>
			<Link to="/about" className="linkToReadMe">
				ABOUT US
			</Link>
		</div>
	);
};

export default Footer;
