'use strict';

const runtimeConfig = require('cloud-functions-runtime-config')
const gPubsub = require('@google-cloud/pubsub')
const gStorage = require('@google-cloud/storage')
const gVision = require('@google-cloud/vision')
//const Buffer = require('safe-buffer').Buffer

const pubsub = gPubsub()
const storage = gStorage()
const vision = gVision

const loadAppEnvVars = runtimeConfig.getVariable('bucket-name')

const detectText = (bucketName, fileName) => {
  return vision.textDetection({
    source: {
      imageUri: `gs://${bucketName}/${fileName}`
    }
  }).then(([detections]) => {
    const annotation = detections.textAnnotations[0]
    text = annotation ? annotation.description : ''
    return text
  })
}

module.exports.parseImage = (req,res) => {

  let file = event.data
  loadAppEnvVars.then(val=>{
    console.log(val)
    detectText(val, 'IMG_20171125_234110.jpg')
  })
  
  res.status(200).send('SUCCESS')
}


module.exports.helloWorld = (req,res) => {
  res.status(200).send('HELLO WORLD FROM SERVERLESS')
};
