process.env.NODE_ENV = 'test'

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../app');
const knex = require('../db/connection')

const fs = require('fs');
const spaces = require('../utils/spaces');

let deleteAfterPostTest = {}

describe('routes : photos', function() {
  beforeEach(function() {
    return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
  })

  afterEach(function() {
    return knex.migrate.rollback()
  })

  after(function() {
    return spaces.deleteFromSpaces(deleteAfterPostTest)
  })

  describe('GET /api/v1/photos', function() {
    it('should return fisrt 10 photos', function(done) {
      chai.request(server)
        .get('/api/v1/photos')
        .end(function(err, res) {
          should.not.exist(err)
          res.status.should.eq(200)
          res.type.should.equal('application/json')
          res.body.data.length.should.eq(10)
          res.body.data[0].should.include.keys(
            'id', 'spaces', 'description', 'created_at'
          )
          done()
        })
    })
  })

  describe('GET /api/v1/photos/?id=14&limit=5', function() {
    it('should return 5 photos starting at the next id', function(done) {
      chai.request(server)
        .get(`/api/v1/photos/?id=17&limit=5`)
        .end(function(err, res) {
          should.not.exist(err)
          res.status.should.eq(200)
          res.type.should.equal('application/json')
          res.body.data.length.should.eq(5)
          res.body.data[0].should.include.keys(
            'id', 'spaces', 'description', 'created_at'
          )
          done()
        })
    })
  })

  describe('GET /api/v1/photos/photo/:id', function() {
    it('should retun a photo given an id', function(done) {
      chai.request(server)
        .get('/api/v1/photos/photo/17')
        .end(function(err, res) {
          should.not.exist(err)
          res.status.should.eq(200)
          res.type.should.equal('application/json')
          res.body.data.length.should.eq(1)
          res.body.data[0].should.include.keys(
            'id', 'spaces', 'description', 'created_at'
          )
          done()
        })
    })

    it('should return 404 with an error message', function(done) {
      chai.request(server)
        .get('/api/v1/photos/photo/99')
        .end(function(err, res) {
          should.not.exist(err)
          res.status.should.eq(404)
          res.type.should.equal('application/json')
          res.body.message.should.eq('That photo does not exist')
          done()
        })
    })
  })

  describe('POST /api/v1/photos', function() {
    this.timeout(6000)
    it('should return photo that was added', function(done) {
      chai.request(server)
      .post('/api/v1/photos')
      .field('Content-Type', 'multipart/form-data')
      .field('description', 'Sophie on an Umbrella')
      .attach('image', fs.readFileSync('./IMG_0543.JPG'), 'IMG_0543.JPG')
      .end(function (err, res) {
        should.not.exist(err)
        res.status.should.eql(201);
        res.type.should.equal('application/json')
        res.body.data[0].should.include.keys(
          'id', 'spaces', 'description', 'created_at'
        )
        deleteAfterPostTest = res.body.data[0].spaces
        done()
      })
    })

  })

  describe('DELETE /api/v1/photos/photo/:id', function() {
    this.timeout(10000)
    it('should delete a photo', function(done) {
      const imageInput = {
        fileName: 'IMG_0543.JPG',
        filePath: './IMG_0543.JPG',
        fileType: 'image/jpg'
      }
      spaces.uploadToSpaces(imageInput)
        .then(function(imageData) {
          knex('photos')
            .insert({
              spaces: imageData,
              description: 'Sohpie'
            })
            .returning('*')
            .then(function(photo) {
              const photoId = photo[0].id
              chai.request(server)
              .delete(`/api/v1/photos/photo/${photoId}`)
              .end(function(err, res) {
                should.not.exist(err)
                res.status.should.eq(200)
                res.type.should.equal('application/json')
                res.body.data.length.should.eq(1)
                res.body.data[0].should.include.keys(
                  'id', 'spaces', 'description', 'created_at'
                )
                knex('photos').select('*')
                  .then(photos => {
                    photos.length.should.equal(17)
                    done()
                  })
              
            })
          })
        })
    })
  })

  describe('PUT /api/v1/photos/photo/:id', function() {
    it('should return a photos with the description updated', function(done) {
      knex('photos')
        .select('*')
        .then(photos => {
          const photoObj = photos[0]
          chai.request(server)
            .put(`/api/v1/photos/photo/${photoObj.id}`)
            .send({
              description: 'New Description'
            })
            .end(function(err, res) {
              should.not.exist(err)
              res.status.should.equal(200)
              res.type.should.equal('application/json')
              res.body.data[0].should.include.keys(
                  'id', 'spaces', 'description', 'created_at'
              )
              const newPhotoOjb = res.body.data[0]
              newPhotoOjb.description.should.not.equal(photoObj.description)
              done()
            })

        })
        
    })

    it('should return 404 with error message', function(done) {
      chai.request(server)
        .put('/api/v1/photos/photo/99')
        .send({
          description: 'New Description'
        })
        .end(function(err, res) {
          should.not.exist(err)
          res.status.should.equal(404)
          res.type.should.equal('application/json')
          res.body.message.should.eq('That photo does not exist.')
          done()
        })
    })
  })
})