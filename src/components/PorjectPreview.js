import React from 'react';
import PropTypes from 'prop-types';

class ProjectPreview extends React.Component {
	handleClick = () => {
		this.props.onClick(this.props.id);
	}
	render() {
		return(
			<div className = "link ProjectPreview" onClick={this.handleClick}>
				<div className = "category-name">
					{this.props.categoryName}
				</div>
				<div className = "project-name">
					{this.props.projectName}
				</div>
			</div>
		);
	}
}

ProjectPreview.propTypes = {
	id: PropTypes.number.isRequired,
	categoryName: PropTypes.string.isRequired,
	projectName: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};
