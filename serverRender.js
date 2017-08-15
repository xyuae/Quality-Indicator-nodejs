import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import config from './config';
import axios from 'axios';

const serverRender = () =>
	//axios.get(`${config.serverUrl}/api/contests`)
	axios.get('http://localhost:8080/api/contests')
		.then(resp => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
			return ReactDOMServer.renderToString(
				<App initialContests={resp.data.contests} />
			);
=======
=======
>>>>>>> Stashed changes
			console.log(resp.data.contests);
			return {
				initialMarkup: ReactDOMServer.renderToString(
					<App initialProjects={resp.data.contests} />
				),
				initialData: resp.data
			};
>>>>>>> Stashed changes
		})
		.catch(console.error);

export default serverRender;
