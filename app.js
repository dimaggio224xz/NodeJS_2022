const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./auth/auth');
require('./db');

const routes = require('./routes/routes');
const secureRoute = require('./routes/secureRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/static', express.static(__dirname + '/public'));

app.use('/', routes);

app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.json({ message: err, entity: null });
});

const port = process.env.PORT || 4040;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
