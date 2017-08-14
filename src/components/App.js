import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import ContestList from './ContestList';

const pushState = (obj, url) =>
	window.history.pushState(obj, '', url);

class App extends React.Component {
	state = {
		pageHeader: 'Quality Indicator',
		projects: this.props.initialProjects
	}
	componentDidMount() {

	}
	componentWillUnmount() {
		// clean listener, timers
	}

	fetchProject = (projectId) => {
		pushState(
			{ currentProjectId: projectId },
			`/project/${projectId}`
		);
	};
	render(){
		return (
			<div className="App">
				<Header Message= {this.state.pageHeader} />
				<ContestList
					onContestClick={this.fetchProject}
					contests={this.state.projects} />
			</div>
		);
	}
}

App.propTypes = {
	initialProjects: PropTypes.array
};

export default App;
