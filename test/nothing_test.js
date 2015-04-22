var chai = require('chai');
var expect = chai.expect;
var nothing = require('../lib/nothing.js');
var Nothing = require('../models/Nothing');
var mongoose = require('mongoose');

describe('Nothing', function () {
  before(function (done) {
    mongoose.connect('mongodb://localhost/nothing_test', done);
  });

  after(function (done) {
    mongoose.disconnect(done);
  });

  beforeEach(function (done) {
    Nothing.remove(function () {
      done();
    });
  });

  describe('#start', function () {
    beforeEach(function (done) {
      nothing.start('uuid', Date.now()).then(function () {
        done();
      });
    });

    it('creates a nothing record', function (done) {
      Nothing.where({ uuid: 'uuid' }).findOne().then(function (nothing) {
        expect(nothing).not.to.be.null;
        expect(nothing.uuid).to.eq('uuid');
        expect(nothing.started_at).to.not.be.null;
        expect(nothing.ended_at).to.be.null;
        done();
      });
    });

    it('upserts a nothing record', function (done) {
      var date = new Date("October 13, 2014 11:13:00");
      nothing.start('uuid', date).then(function () {
        Nothing.where({ uuid: 'uuid' }).findOne().then(function (nothing) {
          expect(nothing).not.to.be.null;
          expect(nothing.uuid).to.eq('uuid');
          expect(nothing.started_at).to.eql(date);
          expect(nothing.ended_at).to.be.null;
          Nothing.where({ uuid: 'uuid' }).count().then(function (count) {
            expect(count).to.eq(1);
            done();
          });
        });
      });
    });
  });

  describe('#stop', function () {
    beforeEach(function (done) {
      nothing.start('uuid', Date.now()).then(function () {
        nothing.stop('uuid', Date.now()).then(function () {
          done();
        });
      });
    });

    it('updates a nothing record', function (done) {
      Nothing.where({ uuid: 'uuid' }).findOne().then(function (nothing) {
        expect(nothing).not.to.be.null;
        expect(nothing.uuid).to.eq('uuid');
        expect(nothing.started_at).to.not.be.null;
        expect(nothing.ended_at).to.not.be.null;
        done();
      });
    });
  });

  describe('#count', function () {
    it('returns zero', function (done) {
      Nothing.count().then(function (count) {
        expect(count).to.eq(0);
        done();
      });
    });
  });
});
