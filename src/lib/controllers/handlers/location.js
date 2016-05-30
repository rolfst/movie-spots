'use strict'

const request = require('request-promise')
const Joi = require('joi')
const _ = require('lodash')
const config = require('getconfig')

const LOWERBOUND_CURSOR = 0
const UPPERBOUND_CURSOR = 50
const DEFAULT_LIMIT = 20
const DEFAULT_OFFSET = 0

const construct_movie_query = (filter) => {
  const whitelist = ['title', '$offset', '$limit']
  const query = _.pick(filter, whitelist)
  const $limit = _.get(query, '$limit') || DEFAULT_LIMIT
  const $offset = _.get(query, '$offset') || DEFAULT_OFFSET
  const $select = 'title,locations'

  return _.defaults({}, query, {$select: $select, $limit: $limit, $offset: $offset})
}

function sendRequest(payload) {
  return request(payload).then((locations) => {
    return locations
  })
}

module.exports.search = {
  validate: {
    query: {
      title: Joi.string(),
      $offset: Joi.number().integer().min(LOWERBOUND_CURSOR),
      $limit: Joi.number().integer().min(LOWERBOUND_CURSOR).max(UPPERBOUND_CURSOR)
    }
  },
  // response: {
  //  schema: Joi.object().keys({
  //  })
  // },
  handler: function (req, reply) {
    const query = construct_movie_query(req.query)

    // search external
    const endpoint = config.movieLocations
    const payload = {uri: endpoint, qs: query}

    req.server.log('debug', payload)
    return sendRequest(payload).then((locations) => reply(locations))
    .catch((e) => {
      req.server.log('error', `${e}`)
    })
  }
}

if (process.env.NODE_ENV === 'development') {
  module.exports.sendRequest = sendRequest
}
