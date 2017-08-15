import express from 'express';
import data from '../src/testData';
import {MongoClient} from 'mongodb';
import assert from 'assert';
import config from '../config';

// connect to mongo db
let mdb;
MongoClient.connect(config.mongodbUri, (err, db) => {
	assert.equal(null, err);
	mdb = db;
});

const router = express.Router();

const contests =  data.contests.reduce((obj, project) => {
	obj[project.id] = project;
	return obj;
}, {});

router.get('/contests', (req, res) => {
	res.send({ contests: contests });
});

router.get('/projects', (req, res) => {
	let projects = {};
	mdb.collection('projects').find({})
		.project({
			id: 1,
			categoryName: 1,
			projectName: 1,
		})
		.each((err, project) => {
			assert.equal(null, err);

			if (!project) { // no more contests
				res.send({projects});
				return;
			}
			projects[project.id] = project;
		});
});

router.get('/projects/:projectId', (req, res) => {
	mdb.collection('projects')
		.findOne({ id: Number(req.params.projectId) })
		.then(project => res.send(project))
		.catch(console.error);
});

export default router;
