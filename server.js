var http = require('http'),
    express = require('express'),
    app = express.createServer(),
    port = process.env.PORT;
 
function home(req, res) {
  res.redirect('/index.html');
}

function proxy(req, res) {
    var odata_request = {
      host: 'services.odata.org',
      headers: {
        'Accept': 'application/json'
      }
    };
    odata_request.path = req.url;
    http.get(odata_request, function (odata_response) {
        res.header('Content-Type', 'application/json');
        odata_response.pipe(res);
    });
}


app.use(express.static(__dirname + '/public'));
app.get('/', home);
app.get('/Northwind/*', proxy);
app.listen(port);