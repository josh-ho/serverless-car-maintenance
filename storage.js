const storage = require('@google-cloud/storage')()
const Buffer = require('safe-buffer').Buffer

module.exports.saveImageToStorage = event => {
  const pubsubMessage = event.data
  const jsonStr = Buffer.from(pubsubMessage.data, 'base64').toString()
  const file = storage.bucket('serverless-car-maintenance').file(filename)
}
