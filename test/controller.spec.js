/* global describe, beforeEach, before, it, expect */
'use strict';

const stubs = require('../stubs')
const hapi = require('hapi')
const rewire = require('rewire')
const locations = rewire('../src/lib/controllers/handlers/location')
const Promise = require('bluebird')
const sinon = require('sinon')

require('sinon-as-promised')(Promise)


describe('location handler', () => {
  let server = null

  beforeEach((done) => {
    locations.__set__('sendRequest', sinon.stub().resolves(stubs.movie))
    server = new hapi.Server()
    server.connection({port: 8080})
    done()
  })

  it.only('should ', function (done) {
    server.route({
      method: 'GET',
      path: '/locations',
      config: locations.search
    })
    const options = {url: '/locations?title=ant-man', method: 'GET'}

    server.inject(options, (response) => {
      expect(response).to.not.be.empty // eslint-disable-line 
      response.statusCode.should.eql(200)
      done()
    });
  })
});
