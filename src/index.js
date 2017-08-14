import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';


ReactDOM.render(
	// <App initialProjects={resp.data.contest} />,
	<App initialProjects={window.initialData.contests} />,
	document.getElementById('root')
);
