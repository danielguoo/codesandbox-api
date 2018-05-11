/**
 * Imports
 */

const shortid = require('shortid')
const {firestoreForkProject} = require('./firestore')

const fork = async function (projectID) {

	if(!projectID){
		console.log("Invalid projectID: " + projectID)
		return {error:true, data:{title:["Invalid projectID: " + projectID]}}
	}

	let result = await firestoreForkProject(projectID, shortid.generate())

	return result
}

module.exports = fork