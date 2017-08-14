import axios from 'axios';

export const fetchProject = projectId => {
	return axios.get(`/api/projects/${projectId}`)
		.then(resp => resp.data);
};
