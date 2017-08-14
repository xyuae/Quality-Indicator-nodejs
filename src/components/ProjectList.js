import React from 'react';
import PropTypes from 'prop-types';
import ProjectPreview from './ProjectPreview';

const ProjectList = ({ projects, onProjectClick }) => (
	<div className="ProjectList">
		{projects.map(project =>
			<ProjectPreview
				key={project.id}
				onClick={onProjectClick}
				{...project} />
		)}
	</div>
);

ProjectList.propTypes = {
	projects: PropTypes.array,
	onProjectClick: PropTypes.func.isRequired
};

export default ProjectList;
