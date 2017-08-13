var projectCounter = 1;

var ProjectProvider = function(){};
ProjectProvider.prototype.dummyData = [];

ProjectProvider.prototype.findAll = function(callback) {
	callback( null, this.dummyData);
};

ProjectProvider.prototype.findById = (id, callback) => {
	var result = null;
	for (var i = 0; i < this.dummyData.length; i++) {
		if (this.dummyData[i]._id == id ) {
			result = this.dummyData[i];
			break;
		}
	}
	callback(null, result);
} ;

ProjectProvider.prototype.save = function(projects, callback) {
	var project = null;

	if (typeof(projects.length) == 'undefined')
		projects = [projects];

	for( var i = 0; i < projects.length; i++ ) {
		project = projects[i];
		project._id = projectCounter++;
		project.create_at = new Date();

		if (project.comments === undefined )
			project.comments = [];

		for( var j = 0; j < project.comments.length; j++) {
			project.comments[j].created_at = new Date();
		}
		this.dummyData[this.dummyData.length] = project;
	}
	callback(null, projects);
};

/* bootstrap with dumy data */
new ProjectProvider().save([
	{title: 'Project one', body: 'Body one', comments:[{author: 'Bob', comment: 'I love it'}, {author: 'Dave', comment: 'This is rubbish'}]},
	{title: 'Project two', body: 'Body two', comments:[{author: 'Bob', comment: 'I love it'}, {author: 'Dave', comment: 'This is rubbish'}]},
	{title: 'Project three', body: 'Body three', comments:[{author: 'Bob', comment: 'I love it'}, {author: 'Dave', comment: 'This is rubbish'}]},
], function(error, projects){});

export default ProjectProvider;
