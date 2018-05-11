/**
 * Imports
 */

const shortid = require('shortid')
const {firestoreForkProject} = require('./firestore')

const forkURL = async function (body) {
	console.log("Forking URL..")
	if(!body || !body.taskUrl){
		console.log("No body or no taskUrl")
		console.log(body)
		return {error:true, data:"No taskUrl provided"}
	}

	let newID = shortid.generate()

	let projectID = ""
	let index = -1
	try{
		index = body.taskUrl.lastIndexOf('/') + 1
		projectID = body.taskUrl.substr(index)
	}catch(err){
		console.log("Couldn't find last segment of taskUrl: " + body.taskUrl)
		console.log(err)
		return {error:true, data:"Couldn't get projectID from url"}
	}

	console.log("Forking to " + newID)

	// let error = true
	let {error} = await firestoreForkProject(projectID, newID)

	if(error)
		return {error:true, data:"Failed to fork " + projectID}
	
	console.log("Forked URL")

	return {error:false, data:body.taskUrl.substr(0, index) + newID}
}

module.exports = forkURL