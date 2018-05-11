/**
 * Imports
 */

const {firestoreGetProjectById} = require('./firestore')

const getProject = async function (projectID) {

	if(!projectID){
		console.log("Invalid projectID: " + projectID)
		return {error:true, data:{title:["Invalid projectID: " + projectID]}}
	}

	return firestoreGetProjectById(projectID)
  
}

module.exports = getProject
