var chai = require('chai');
var expect = chai.expect;
var mongoose = require('mongoose');
var nothing = require('../lib/nothing.js');
var Nothing = require('../models/Nothing');

var request = require('supertest');
var express = require('express');
var app = require('../lib/app.js').instance();

describe('App', function () {
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

  it('nothing', function (done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function(err, res){
        if (err) throw err;
        expect(res.body).to.eql({ nothing: true });
        done();
      });
  });

  it('post', function (done) {
    request(app)
      .post('/nothing')
      .send({ uuid: 'uuid' })
      .expect(201)
      .end(function(err, res){
        if (err) throw err;
        expect(res.body).to.eql({ count: 1 });
        done();
      });
  });

  it('delete', function (done) {
    nothing.start('uuid', new Date()).then(function () {
      request(app)
        .delete('/nothing')
        .send({ uuid: 'uuid' })
        .expect(200)
        .end(function(err, res){
          if (err) throw err;
          expect(res.body).to.eql({ count: 0 });
          done();
        });
    });
  });

  it('delete an unknown uuid', function (done) {
    request(app)
      .delete('/nothing')
      .send({ uuid: 'uuid' })
      .expect(404)
      .end(function(err, res){
        if (err) throw err;
        expect(res.body).to.eql({ error: 'Not Found' });
        done();
      });
  });

  it('nothing', function (done) {
    request(app)
      .get('/nothing')
      .expect(200)
      .end(function(err, res){
        if (err) throw err;
        expect(res.body).to.eql({ count: 0 });
        done();
      });
  });
});
