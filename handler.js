const image = require('./image.js')
const storage = require('./storage.js')

module.exports.parseImage = image.parseImage
module.exports.storage = storage.saveImageToStorage

module.exports.helloWorld = (req,res) => {
  res.status(200).send('HELLO WORLD FROM SERVERLESS')
};
