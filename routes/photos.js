const Router = require('@koa/router')
const queries = require('../db/queries/photos')

const photos = new Router

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

module.exports = photos