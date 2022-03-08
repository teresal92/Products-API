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
app.get('/loaderio-efdacdd7a84269f78bcb1e4230b54177', (req, res) => {
  res.send('loaderio-efdacdd7a84269f78bcb1e4230b54177');
});

// routes
app.use('/products-api', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
