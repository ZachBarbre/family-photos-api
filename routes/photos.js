const Router = require('@koa/router')
const dayjs = require('dayjs')
const sharp = require('sharp')
const queries = require('../db/queries/photos')
const spaces = require('../utils/spaces')

const photos = new Router
dayjs().format()

const BASE_URL = '/api/v1/photos'

photos.get('photos', BASE_URL, async (ctx) => {
  const { id, limit } = ctx.request.query
  try {
    const photos = id 
      ? await queries.getPaginationPhotos(id, limit)
      : await queries.getFirstTenPhotos()
    ctx.status = 200
    ctx.body = {
      status: 'success',
      data: photos
    }
  } catch (error) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: error.message || 'An error has occured'}
    console.error(error)
  }
})

photos.get(`${BASE_URL}/photo/:id`, async (ctx) => {
  const id = ctx.params.id
  try {
    const photo = await queries.getSinglePhoto(id)
    if (photo.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: photo
      }
    } else {
      ctx.status = 404
      ctx.body = {
        status: 'error',
        message: 'That photo does not exist'
      }
    }
  } catch (error) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: error.message || 'An error has occured'}
    console.error(error)
  }
})

photos.post(BASE_URL, async (ctx) => {
  try {
    const file = ctx.request.files.image
    const uploadDate = ctx.request.files.image.lastModifiedDate
    const fileName = `${dayjs(uploadDate).unix()}-${file.name}`
    const imageInput = {
      fileName: fileName,
      filePath: file.path,
      fileType: file.type
    }
    const imageData = await spaces.uploadToSpaces(imageInput)
    const description = ctx.request.body.description
    
    const photo = await queries.addPhoto({
      spaces: imageData,
      description: description
    })

    if (photo.length) {
      ctx.status = 201
      ctx.body = {
        status: 'success',
        data: photo
      }
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong'
      }
    }
  } catch (error) {
    console.error(error)
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: error.message || 'Sorry, an error has occured.'
    }
  }
})

photos.delete(`${BASE_URL}/photo/:id`, async (ctx) => {
  try {
    const photo = await queries.deletePhoto(ctx.params.id)
    if (photo.length) {
      const deletedPhotos = await spaces.deleteFromSpaces(photo[0].spaces)

      if (deletedPhotos === 'success') {
        ctx.status = 200;
        ctx.body = {
          status: 'success',
          data: photo
        }
      } else {
        ctx.status = 500
        ctx.body = {
          status: 'error',
          message: 'An error has occured deleting photos from spaces'
        }
      }
    } else {
      ctx.status = 404
      ctx.body = {
        status: 'error',
        message: 'That photo does not exist.'
      }
    }
  } catch (error) {
    console.error(error)
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: error.message || 'Sorry, an error has occured.'
    }
  }
})

photos.put(`${BASE_URL}/photo/:id`, async (ctx) => {
  try {
    const photo = await queries.updatePhoto(ctx.params.id, ctx.request.body)
    if (photo.length) {
      ctx.status = 200
      ctx.body = {
        status: 'success',
        data: photo
      }
    } else {
      ctx.status = 404
      ctx.body = {
        status: 'error',
        message: 'That photo does not exist.'
      }
    }
  } catch (error) {
    console.error(error)
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: error.message || 'Sorry, an error has occured.'
    }
  }
})
module.exports = photos