/**
 * Imports
 */

const {firestoreUpdateProjectById, firestoreGetProjectById} = require('./firestore')

const updateModules = async function (projectID, body) {
	if(!projectID){
		console.log("Invalid projectID: " + projectID)
		return {error:true, data:{title:["Invalid projectID: " + projectID]}}
	} else if(!body || !body.project){
		console.log("No body or no project")
		console.log(body)
		return {error:true, data:{title:["No body or no project"]}}
	}
	// let projectInfo = JSON.parse(body.project)
	let projectInfo = body.project

	let success = firestoreUpdateProjectById(projectID, projectInfo)

	if(!success)
		return {error:true, data:{title:["Failed to update project"]}}

	return await firestoreGetProjectById(projectID)
  
}

module.exports = updateModules
