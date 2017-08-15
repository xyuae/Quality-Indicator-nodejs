import axios from 'axios';

export const fetchProject = projectId => {
	return axios.get(`/api/projects/${projectId}`)
		.then(resp => resp.data);
};

export const fetchContest = contestId => {
	return axios.get(`/api/contests/${contestId}`)
		.then(resp => resp.data);
};
