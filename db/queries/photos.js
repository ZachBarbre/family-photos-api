const knex = require('../connection')

function getFirstTenPhotos() {
  return knex('photos')
    .select('*')
    .orderBy('created_at', 'desc')
    .limit(10)
}

function getPaginationPhotos(id, limit = 10) {
  return knex('photos')
    .select('*')
    .where('id', '<', id)
    .orderBy('created_at', 'desc')
    .limit(limit)
}

function getSinglePhoto(id) {
  return knex('photos')
    .select('*')
    .where('id', id)
}

function addPhoto(photo) {
  return knex('photos')
    .insert(photo)
    .returning('*')
}

function deletePhoto(id) {
  return knex('photos')
    .del()
    .where('id', id)
    .returning('*')
}

function updatePhoto(id, photo) {
  return knex('photos')
    .update(photo)
    .where('id', id)
    .returning('*')
}

module.exports = {
  getFirstTenPhotos,
  getPaginationPhotos,
  getSinglePhoto,
  addPhoto,
  deletePhoto,
  updatePhoto
}