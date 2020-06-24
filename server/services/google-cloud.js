const { googleStorage } = require('../config');
const { Storage } = require('@google-cloud/storage');

const gc = new Storage(googleStorage.config);

const bucket = gc.bucket(googleStorage.bucketName);

module.exports = {
	bucket
};
