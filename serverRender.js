import React from 'react';
import ReactDOMServer from 'react-dom/server'; // render the DOM from server

import App from './src/components/App';

import config from './config';
import axios from 'axios';

const serverRender = () =>
	axios.get(`${config.serverUrl}/api/contests`)
	//axios.get('http://localhost:8080/api/contests')
		.then(resp => {
			return {
				initialMarkup: ReactDOMServer.renderToString(
					<App initialProjects={resp.data.contests} />
				),
				initialData: resp.data
			};
		})
		.catch(console.error);

export default serverRender;
