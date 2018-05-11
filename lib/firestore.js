const firebase = require('firebase')
const uuid = require('uuid')
const shortid = require('shortid')
const omit = require('@f/omit')
require('firebase/firestore')

const config = {
	apiKey: "AIzaSyDt04CsWlbKXO5hwWVUvH8a1jsooCh7xkY",
	authDomain: "scratch-docket.firebaseapp.com",
	databaseURL: "https://scratch-docket.firebaseio.com",
	projectId: "scratch-docket",
	storageBucket: "scratch-docket.appspot.com",
	messagingSenderId: "369706258329"
};

const default_template = {
  "targets": [
    {
      "isStage": true,
      "name": "Stage",
      "variables": {
        "`jEk@4|i[#Fk?(8x)AV.-my variable": [
          "my variable",
          0
        ]
      },
      "lists": {},
      "broadcasts": {},
      "blocks": {},
      "currentCostume": 0,
      "costumes": [
        {
          "assetId": "739b5e2a2435f6e1ec2993791b423146",
          "name": "backdrop1",
          "bitmapResolution": 1,
          "md5ext": "739b5e2a2435f6e1ec2993791b423146.png",
          "dataFormat": "png",
          "rotationCenterX": 240,
          "rotationCenterY": 180
        }
      ],
      "sounds": [
        {
          "assetId": "83a9787d4cb6f3b7632b4ddfebf74367",
          "name": "pop",
          "dataFormat": "wav",
          "format": "",
          "rate": 11025,
          "sampleCount": 258,
          "md5ext": "83a9787d4cb6f3b7632b4ddfebf74367.wav"
        }
      ],
      "volume": 100,
      "tempo": 60,
      "videoTransparency": 50,
      "videoState": "off"
    },
    {
      "isStage": false,
      "name": "Sprite1",
      "variables": {},
      "lists": {},
      "broadcasts": {},
      "blocks": {},
      "currentCostume": 0,
      "costumes": [
        {
          "assetId": "09dc888b0b7df19f70d81588ae73420e",
          "name": "costume1",
          "bitmapResolution": 1,
          "md5ext": "09dc888b0b7df19f70d81588ae73420e.svg",
          "dataFormat": "svg",
          "rotationCenterX": 47,
          "rotationCenterY": 55
        },
        {
          "assetId": "3696356a03a8d938318876a593572843",
          "name": "costume2",
          "bitmapResolution": 1,
          "md5ext": "3696356a03a8d938318876a593572843.svg",
          "dataFormat": "svg",
          "rotationCenterX": 47,
          "rotationCenterY": 55
        }
      ],
      "sounds": [
        {
          "assetId": "83c36d806dc92327b9e7049a565c6bff",
          "name": "Meow",
          "dataFormat": "wav",
          "format": "",
          "rate": 22050,
          "sampleCount": 18688,
          "md5ext": "83c36d806dc92327b9e7049a565c6bff.wav"
        }
      ],
      "volume": 100,
      "visible": true,
      "x": 0,
      "y": 0,
      "size": 100,
      "direction": 90,
      "draggable": false,
      "rotationStyle": "all around"
    }
  ],
  "meta": {
    "semver": "3.0.0",
    "vm": "0.1.0",
    "agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
  }
}

const new_project = {
  data:[{
  id: 0,
  assetType: 'Project',
  dataFormat: 'JSON',
  data: JSON.stringify(default_template)
}]}


const firestore = firebase.initializeApp(config).firestore()

const firestoreDeleteProjectById = (projectId) => {
	console.log(`Deleting project ${projectId}....`)
	try{
    firestore.collection('projects').doc(projectId).delete()
    //let doc = firestore.collection('projects').doc(projectId).set(new_project)
	} catch(err){
		console.log(`Failed to delete ${projectId}`)
		console.log(err)
		return false;
	}
  console.log(`Deleted project ${projectId}`)

	return true;

}



const firestoreForkProject = async function (originalId, newId) {
	console.log(`Forking project ${originalId} to ${newId}....`)
	let result = await firestoreGetProjectById(originalId)
	// console.log(result)
	let {error, data} = result
	if(error){
		return {error:true, data:{title:["TO BE DONE"]}}
	}


	try{
		firestore.collection('projects').doc(newId).set(data)
	} catch(err){
		console.log(`Failed to fork project ${originalId} to ${newId}`)
		console.log(err)
		return {error:true, data:{title:["TO BE DONE"]}}
	}
	console.log(`Forked project ${originalId} to ${newId}....`)

	return {data:data}
}

const firestoreGetProjectById = async function (projectId) {
	console.log(`Reading project ${projectId}....`)

	let data = {title:["TO BE DONE"]}
	try{
		let doc = await firestore.collection('projects').doc(projectId).get()
		if(doc.exists){
			data = doc.data()
			console.log(`Found and read project ${projectId}`)
		} else {
			console.log(`Couldn't find project ${projectId}`)
			return {error:true, data}
		}
	} catch(err){
		console.log(`Couldn't get project ${projectId}`)
		console.log(err)
		return {error:true, data};
	}

	return {error:false, data}
}


const firestoreUpdateProjectById = (projectId, projectInfo) => {
	console.log(`Updating project ${projectId}....`)

	try{
		let curDate = new Date()
		projectInfo.update_at = curDate.toISOString()
		firestore.collection('projects').doc(projectId).update(projectInfo)
		console.log(`Found and updated project ${projectId}`)
	} catch(err){
		console.log(`Couldn't find project ${projectId}`)
		console.log(err)
		return false
	}

	return true
}



module.exports.firestore = firestore
module.exports.firestoreGetProjectById = firestoreGetProjectById
module.exports.firestoreUpdateProjectBId = firestoreUpdateProjectById
module.exports.firestoreForkProject = firestoreForkProject
module.exports.firestoreDeleteProjectById = firestoreDeleteProjectById


