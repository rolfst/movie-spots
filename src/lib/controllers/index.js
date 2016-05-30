'use strict'

const glob = require('glob')
const path = require('path')

const load = function (options, callback) {

  options = options || {}
  options.extension = options.extension || '.js'
  const controllers = {}
  const files = glob.sync(`*${options.extension}`, {cwd: options.path || __dirname})

  for (const i in files) {
    if (files[i] !== path.basename(__filename)) {
      let key = path.basename(files[i], options.extension)

      key = key.charAt(0).toUpperCase() + key.slice(1)
      const controller_path = (options.path || __dirname) + `/${files[i]}` // eslint-disable-line prefer-template

      controllers[key] = require(controller_path)
    }
  }

  if (callback) {
    return callback(null, controllers)
  }

  return controllers;
}

exports.register = function (plugin, options, next) {
  load({path: `${__dirname}/handlers`}, (err, handlers) => {
    if (err) {
      throw err
    }

    plugin.expose('handlers', handlers)
    next()
  });
}

exports.register.attributes = {
  name: 'controllers',
  version: require('../../../package.json').version
}
