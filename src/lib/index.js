'use strict'

const _ = require('lodash')
const Glue = require('glue')

require('hapi')

const internals = {
  manifest: {
    connections: [
      {
        port: 8088,
        labels: ['api']
      },
      {
        port: 8080,
        labels: ['http']
      }
    ],
    registrations: [
      {
        plugin: {
          register: 'disinfect',
          options: {
            disinfectQuery: true,
            disinfectParams: true,
            disinfectPayload: true
          }
        }
      },
      {
        plugin: {
          register: 'blipp',
          options: {}
        }
      },
      {
        plugin: {
          register: 'bucker',
          options: [{console: {color: true}}]
        }
      },
      {
        plugin: {
          register: './controllers',
          options: [{select: ['api']}]
        }
      },
      {
        plugin: {
          register: './api',
          options: [{select: 'api'}]
        }
      }
    ]
  }
}

Glue.compose(internals.manifest, {relativeTo: __dirname}, (err, server) => {
  if (err) {
    server.log('error register error: ', err)
  }
  server.start(() => {
    if (!module.parent) {
      const server_uris = _.join(server.connections.map(function (connection) {
        return connection.info.uri
      }), ', ')

      server.log('info', `server started at: ${server_uris}`)
    } else {
      module.exports = server
    }
  })
})

