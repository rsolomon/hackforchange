var http = require('http');
var https = require('https');
var url = require('url');
var qs = require('querystring');
var co2 = {
  routes: {
    /**
     * Search API for flight information
     */
    '/flights': function(req, res) {
      var HOST = 'airportcode.riobard.com';
      var PATH = '/search';

      var urlParts = url.parse(req.url, true),
        query = urlParts.query;

      query.fmt = 'JSON';

      res.writeHead(200, {
        'Content-Type': 'text/json',
        'Access-Control-Allow-Origin': '*'
      });

      var data = qs.stringify(query);
      http.get({
        host: HOST,
        path: [PATH, data].join('?'),
        headers: {
          'Accept': 'application/json',
          'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
          'Accept-encoding': 'gzip,deflate,sdch'
        }
      }, function(response) {
        response.on('data', function(d) {
          res.end(d);
        });
      }).end();
    },

    /**
     * Hacky proxy server for AMEE APIs. Just do a GET request with:
     *  - path: {path to AMEE API, minus the HOST)
     *  - any other arguments that the API needs.
     */
    '/amee': function(req, res) {
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
    pathname = urlParts.pathname;
  if (co2.routes[pathname]) {
    co2.routes[pathname](req, res);
  } else {
    res.end(pathname + ' not found.');
  }
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

