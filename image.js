const runtimeConfig = require('cloud-functions-runtime-config')
const vision = require('@google-cloud/vision')
const client = (vision.v1) ? new vision.v1.ImageAnnotatorClient() : new vision.ImageAnnotatorClient()

const textDetection = url => {
  return new Promise( resolve => {
    client.textDetection(url).then(
      ([detections]) => {
        const annotation = detections.textAnnotations[0]
        if(annotation) {
          resolve(detections.textAnnotations)
        } else {
          resolve(detections)
        }
      }
    )
  })
}

const labelDetection = url => {
  return new Promise( resolve => {
    client.labelDetection(url).then(
      (results) => {
        resolve(results[0].labelAnnotations)
      }
    )
  })
}

const webDetection = url => {
  return new Promise( resolve => {
    client.webDetection(url).then(
      ([results]) => {
        resolve(results)
      }
    )
  })
}

module.exports.parseImage = (req,res) => {
  let returnObj = {}
  Promise.all([
    textDetection('https://storage.googleapis.com/serverless-car-maintenance-image-bucket/IMG_20171125_234110.jpg'),
    labelDetection('https://storage.googleapis.com/serverless-car-maintenance-image-bucket/IMG_20171125_234110.jpg'),
    webDetection('https://storage.googleapis.com/serverless-car-maintenance-image-bucket/IMG_20171125_234110.jpg')
  ]).then(values => {
    returnObj = Object.assign(returnObj, values)
    res.status(200).send(JSON.stringify(returnObj))
  })
}
