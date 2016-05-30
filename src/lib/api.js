'use strict'

exports.register = function (plugin, options, next) {

  plugin.dependency('controllers')

  const Controllers = plugin.plugins.controllers.handlers

  plugin.route([
    {method: 'GET', path: '/locations', config: Controllers.Location.search}
  ])
  next()
}

exports.register.attributes = {
  name: 'api',
  version: require('../../package.json').version
}
