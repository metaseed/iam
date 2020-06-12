
var { config, app } = require('./server');

var port = process.env.OAUTH_PORT || config.oauth_port || 9999;

app.listen(port, null, function (err) {
  console.log('Gatekeeper, at your service: http://localhost:' + port);
});