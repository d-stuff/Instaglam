const { bucket } = require('./google-cloud');
const replaceFileNameWithUUID = require('../utils/replaceFileName');

const uploadFile = (originalname, buffer) =>
  new Promise((resolve, reject) => {
    const filename = replaceFileNameWithUUID(originalname);

    const blob = bucket.file(filename);
    const blobStream = blob.createWriteStream({
      resumable: false
    });

    blobStream
      .on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

        resolve(publicUrl);
      })
      .on('error', () => {
        reject(new Error(`Unable to upload media, something went wrong`));
      })
      .end(buffer);
  });

const deleteFile = async (url) => {
  const fileName = url.split(`${bucket.name}/`)[1];
  return bucket.file(fileName).delete();
};

module.exports = {
  uploadFile,
  deleteFile
};
