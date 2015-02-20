var User = require('../user/userModel.js');
var Endpoint = require('../endpoint/endpointModel.js');
var url = require('url');

var getData = function(req, res, next) {
  var username = req.params.username;
  var route = req.params[0];
  var method = req.method;

  Endpoint.findOne({ 'username': username, 'route': route }, function (err, endpoint) {
    if (err) return res.status(500).end(err);
    if(!endpoint) {
      return res.status(500).end(err);
    } else {
      var statusCode = endpoint.methods[method].status;
      
      //if persistance is set to true, we let the user persist data through their API endpoint
      if(endpoint.persistance === true) {

        //if we have params, get specific data from data inserted through API created
        if(req.query.id) {
          var query = parseInt(req.query.id);
          for(var i=0; i<endpoint.data.length; i++) {
            var dataPoint = endpoint.data[i];
            if(dataPoint.id === query) {
              res.status(statusCode).json(dataPoint);
            }
          }
          res.status(500).end();
        } else {
          //add headers in the response
          //get data from data inserted through API created
          var data = endpoint.data;
          res.status(statusCode).json(data);
        }
      } else {
        //get data from user input
        var data = endpoint.methods[method].data;
        res.status(statusCode).json(data);
      }
    }
  });
};

var postData = function(req, res, next) {

  var username = req.params.username;
  var route = req.params[0];
  var method = req.method;

  Endpoint.findOne({ 'username': username, 'route': route }, function (err, endpoint) {
    if (err) return res.status(500).end(err);
    if(!endpoint) {
      return res.status(500).end(err);
    } else {

      var statusCode = endpoint.methods[method].status;
      
      //if persistance is set to true, we let the user persist data through their API endpoint
      if(endpoint.persistance === true) {
        var params = req.body;
        //TODO --> we could do some data validation in here, checking for specific key-value pairs that the user passed through the UI
        params['id'] = endpoint.count++;
        //update endpoint.data of that endpoint
        Endpoint.update({ 'username': username, 'route': route }, {$push: {'data': params}}, function(err, numAffected, rawResponse) {
          if (err) return res.status(500).json(err); 
          console.log(numAffected, rawResponse);
          res.status(statusCode).end();
        }); 
      } else {
        //get data from user input
        var data = endpoint.methods[method].data;
        res.status(statusCode).json(data);
      }
    }
  });

};

var changeData = function(req, res, next) {

};

var deleteData = function(req, res, next) {

};


module.exports = {
  getData: getData,
  postData: postData,
  changeData: changeData,
  deleteData: deleteData
};