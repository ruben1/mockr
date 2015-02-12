var router = require('express').Router();

module.exports = function applicationRouter(app) {
	
  require('./api/user')(router);
  require('./api/endpoint')(router);

  app.use(router);
};