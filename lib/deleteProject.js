/**
 * Imports
 */

const shortid = require('shortid')
const {firestoreDeleteProjectById} = require('./firestore')

const deleteProject = async function (projectID) {
	if(!projectID){
		console.log("Invalid projectID: " + projectID)
		return {error:true, data:{title:["Invalid projectID: " + projectID]}}
	} 
	
	return firestoreDeleteProjectById(projectID) ? {error:false, data:{}} : {error:true, data:{title:["Failed to delete project " + projectID]}}


}

module.exports = deleteProject
