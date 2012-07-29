var http = require('http');
var https = require('https');
var url = require('url');
var qs = require('querystring');
var nodeStatic = require('node-static');
var util = require('util');

var file = new(nodeStatic.Server)('./client');

var co2 = {
  serveStatic: function(req, res) {
    req.addListener('end', function() {
      file.serve(req, res, function(err, result) {
        if (err) {
          console.error('Error serving %s - %s', req.url, err.message);
          if (err.status === 404 || err.status === 500) {
            file.serveFile(err.status + '.html', err.status, {}, req, res);
          } else {
            res.writeHead(err.status, err.headers);
            res.end();
          }
        } else {
          console.log('%s - %s', req.url, res.message);
        }
      });
    });
  },

  routes: {
    'sms': function(req, res) {
      var urlParts = url.parse(req.url, true),
        query = urlParts.query;
      res.writeHead(200, {
        'Content-Type': 'text/json',
        'Access-Control-Allow-Origin': '*'
      });
      Parse = require("./Parse.js");
      parse = new Parse("glA2qVYleTleiRWsqapf3gdtLvH7ckbsDue1WmjX", "r54rGq1JXf624OD3XlLHRDzKVczOMmhs9uMIAl5j");
      var number = query.From, message = query.Body;
      parse.user({ phoneNumber: number }, function(err, response) {
        console.log(response);
        for (var i = 0; i < response.results.length; i++) {
          if (response.results[i].phoneNumber === number) {
            var user = response.results[i];
            var event = {
              date: new Date(),
              cost: 15.6,
              category: 'drive',
              parent: user.objectId
            };
            parse.insert("Co2Event", event, function(err, response) {
              console.log(err);
              console.log(response);
            });
          }
        }
      });
      console.log("query ");
      console.dir(query);
      query = '';

      res.end('<?xml version="1.0" encoding="UTF-8" ?>' +
          '<Response>' +
              '<Sms>Query = ' + query + '</Sms>' +
          '</Response>');
    },

    /**
     * Search API for flight information
     */
    'flights': function(req, res) {
      var HOST = 'airportcode.riobard.com';
      var PATH = '/search';

      var urlParts = url.parse(req.url, true),
        query = urlParts.query;

      query.fmt = 'JSON';
      if (query.query) {
        query.q = query.query;
        delete query.query;
      }

      res.writeHead(200, {
        'Content-Type': 'text/xml',
      });

      var resp = {
        query: query.q,
        suggestions: [],
        data: []
      };

      var data = qs.stringify(query);
      http.get({
        host: HOST,
        path: [PATH, data].join('?'),
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
          'Accept-encoding': 'gzip,deflate,sdch'
        }
      }, function(response) {
        response.on('data', function(d) {
          var cleaned = d.toString('utf-8');

          // Yea a try/catch. It's a hackathon!
          try {
            var data = JSON.parse(cleaned);
          } catch (err) {
            res.end(JSON.stringify(resp));
            return true;
          }
          for (var i = 0; i < data.length; i++) {
            var entry = data[i];
            resp.suggestions.push(entry['name']);
            resp.data.push(entry['code']);
          }

          res.end(JSON.stringify(resp));
        });
      }).end();
    },

    /**
     * Hacky proxy server for AMEE APIs. Just do a GET request with:
     *  - path: {path to AMEE API, minus the HOST)
     *  - any other arguments that the API needs.
     */
    'amee': function(req, res) {
      var HOST = 'api-stage.amee.com';

      var urlParts = url.parse(req.url, true),
        query = urlParts.query,
        path = query.path;
      delete query.path;

      res.writeHead(200, {
        'Content-Type': 'text/json',
        'Access-Control-Allow-Origin': '*'
      });

      var data = qs.stringify(query);
      https.get({
        host: HOST,
        path: [path, data].join('?'),
        auth: 'delpharah' + ':' + 'usjr2h67',
        headers: {
          'Authorization': 'Basic ' + new Buffer('delpharah' + ':' + 'usjr2h67').toString('base64'),
          'Accept': 'application/json',
          'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
          'Accept-encoding': 'gzip,deflate,sdch'
        }
      }, function(response) {
        response.on('data', function(d) {
          res.end(d);
        });
      }).end();
    }
  }
};

http.createServer(function (req, res) {
  var urlParts = url.parse(req.url, true),
    pathname = urlParts.pathname.split('/')[1];
  if (co2.routes[pathname]) {
    co2.routes[pathname](req, res);
  } else {
    co2.serveStatic(req, res);
  }
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');

