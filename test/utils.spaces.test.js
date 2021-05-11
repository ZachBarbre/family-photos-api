// process.env.NODE_ENV = 'test'

// const chai = require('chai');
// const should = chai.should();
// const storageBucket = require('../utils/storageBucket')

// const fs = require('fs');

// describe('utils : storage buckets', function() {
//   describe('storageBucket.getBucket', function() {
//     it('it should return the bucket name from the env passed', function(done) {
//       storageBucket.getBucket('test').should.eql('barbrephotos-test')
//       storageBucket.getBucket('development').should.eql('barbrephotos-dev')
//       storageBucket.getBucket('production').should.eql('barbrephotos')
//       done()
//     })
//   })

//   describe('storageBucket.upload', function() {
//     it('should return the key and url fo a photo uploaded to storage bucket', function(done) {
//       const imageObj = { 
//         fileName: 'P1000221.JPG', 
//         filePath: fs.readFileSync('../P1000221.JPG'), 
//         fileType: 'image/jpeg'
//       }
//       storageBucket.upload(imageObj).then(image => {
//         image.url.should.equal('https://barbrephotos-test.nyc3.digitaloceanspaces.com/2021-05-10T01:45:08.763Z-P1000221.JPG')
//         image.id.should.equal('2021-05-10T01:45:08.763Z-P1000221.JPG')
//         done()
//       })
//     })
//   })
// })