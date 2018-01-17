const runtimeConfig = require('cloud-functions-runtime-config')
const vision = require('@google-cloud/vision')
const client = (vision.v1) ? new vision.v1.ImageAnnotatorClient() : new vision.ImageAnnotatorClient()

module.exports.parseImage = (req,res) => {
  client.textDetection('https://storage.googleapis.com/serverless-car-maintenance-image-bucket/IMG_20171125_234110.jpg').then(([detections]) => {
    const annotation = detections.textAnnotations[0]
    if(annotation) {
      res
        .status(200)
        .send(JSON.stringify(detections.textAnnotations))
    } else {
      res
        .status(200)
        .send(JSON.stringify(detections))
    }

  })
}


module.exports.helloWorld = (req,res) => {
  res.status(200).send('HELLO WORLD FROM SERVERLESS')
};
