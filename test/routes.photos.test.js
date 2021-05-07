process.env.NODE_ENV = 'test'

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../app');
const knex = require('../db/connection')

describe('routes : photos', function() {
  beforeEach(function() {
    return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
  })

  after(function() {
    return knex.migrate.rollback()
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
            'id', 'url', 'hearts', 'description', 'photo_date', 'created_at'
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
            'id', 'url', 'hearts', 'description', 'photo_date', 'created_at'
          )
          done()
        })
    })
  })

  describe('GET /api/v1/photos/photo/:id', function() {
    it('should retun a photo given an id', function(done) {
      chai.request(server)
        .get('/api/v1/photos/photo/14')
        .end(function(err, res) {
          should.not.exist(err)
          res.status.should.eq(200)
          res.type.should.equal('application/json')
          res.body.data.length.should.eq(1)
          res.body.data[0].should.include.keys(
            'id', 'url', 'hearts', 'description', 'photo_date', 'created_at'
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
})