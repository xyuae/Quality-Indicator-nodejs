import config from './config';
import apiRouter from './api';
import sassMiddleWare from 'node-sass-middleware';
import path from 'path';

import express from 'express';
const server = express();

server.use(sassMiddleWare({
	src: path.join(__dirname, 'sass'),
	dest: path.join(__dirname, 'public')
}));

server.set('view engine', 'ejs');
// debugger;
// debugger;
server.use('/api', apiRouter);


import serverRender from './serverRender';
server.get('/', (req, res) => {
	serverRender()
		.then(content => {
			res.render('index', {
				content
			});
		})
		.catch(console.error);
});


server.use(express.static('public'));

server.listen(config.port, () => {
	console.info('Express listening on port ', config.port);
});
