const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const router = require('./routes.js');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/loaderio-db8dd5d41051ef7d341b88565e87b1dc.txt', express.static(__dirname + '/loaderio-db8dd5d41051ef7d341b88565e87b1dc.txt'))

// GET Request
app.get('/loaderio-db8dd5d41051ef7d341b88565e87b1dc', (req, res) => {
  res.send('loaderio-db8dd5d41051ef7d341b88565e87b1dc');
});

// routes
app.use('/products-api', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
