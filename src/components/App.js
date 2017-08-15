import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import ContestList from './ContestList';
import * as api from '../api'

const pushState = (obj, url) =>
	window.history.pushState(obj, '', url);

class App extends React.Component {
	state = {
		pageHeader: 'Quality Indicator',
		projects: this.props.initialContests
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
		// api.fetchProject(projectId).then(project => {
		// 	this.setState
		// });
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
	initialContests: PropTypes.array
};

export default App;
