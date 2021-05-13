const AWS = require('aws-sdk')
const fs = require('fs')
const sharp = require('sharp')

require('dotenv').config()


function getBucket(env) {
  if (env === 'test') {
    return 'barbrephotos-test'
  }
  if (env === 'development') {
    return 'barbrephotos-dev'
  }
  if (env === 'production') {
    return 'barbrephotos'
  }
}

async function upload(image) {
  return new Promise((resolve, reject) => {

    const { fileName, filePath, fileType, resize } = image
    const enviroment = process.env.NODE_ENV || 'development';
    const bucket = getBucket(enviroment);

    const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com')

    const s3 = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: process.env.SPACES_KEY,
      secretAccessKey: process.env.SPACES_SECRET
    })
    const stream = resize 
      ? filePath
      : fs.createReadStream(filePath)
    // stream.on('error', function(error) {
    //   console.error('stream', error)
    //   reject(error)
    // })

    const uploadParams = {
      Bucket: bucket,
      Key: fileName,
      Body: stream,
      ContentType: fileType,
      ACL: 'public-read'
    }
    
    s3.upload(
      uploadParams,
      function(error, data) {
        if (error) {
          console.error('upload', error)
          reject(error)
        } else if (data) {
          resolve({ id: data.Key, url: data.Location })
        }
      }
    )  
  })
}

async function deleteImage(key) {
  return new Promise((resolve, reject) => {
    const enviroment = process.env.NODE_ENV || 'development';
    const bucket = getBucket(enviroment);

    const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com')

    const s3 = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: process.env.SPACES_KEY,
      secretAccessKey: process.env.SPACES_SECRET
    })

    const deleteParams = {
      Bucket: bucket,
      Key: key
    }

    s3.deleteObject(
      deleteParams,
      function(error, data) {
        if (error) {
          console.error(error)
          reject(error)
        } else if (data) {
          resolve(data)
        }
      }
    )
  })
}

async function uploadToSpaces(image) {
  const { fileName, filePath, fileType } = image

  async function resize(size) {
    const buffer = await sharp(filePath)
    .resize({ width: size })
    .withMetadata()
    .toBuffer()
    const imageInput = {
      fileName: `${size}-${fileName}`,
      filePath: buffer,
      fileType: fileType,
      resize: true
    }
    const resizeImage = await upload(imageInput)
    const cdnUrl = resizeImage.url.replace('nyc3', 'nyc3.cdn')
    resizeImage.url = cdnUrl
    return resizeImage
  }

  const fullImageInput = {
    fileName: `full-${fileName}`,
    filePath: filePath,
    fileType: fileType,
    resize: false
  }
  const fullImage = await upload(fullImageInput)
  const cdnUrl = fullImage.url.replace('nyc3', 'nyc3.cdn')
  fullImage.url = cdnUrl

  const imageObj = {
    image_full: fullImage,
    image_620: await resize(620),
    image_748: await resize(748),
    image_1004: await resize(1004),
    image_1580: await resize(1580),
    image_1900: await resize(1900),
  }

  return imageObj
}

async function deleteFromSpaces(spaces) {
  for (const image in spaces) {
    try {
      await deleteImage(spaces[image].id)
    } catch (error) {
      return error
    }
  }

  return 'success'
}

module.exports = {
  upload,
  getBucket,
  uploadToSpaces,
  del: deleteImage,
  deleteFromSpaces
}