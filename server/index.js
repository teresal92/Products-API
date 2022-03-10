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
app.get('loaderio-c13cae3e6df0353a5f3f53fe3caab256', (req, res) => {
  res.send('loaderio-c13cae3e6df0353a5f3f53fe3caab256');
});

// routes
app.use('/products-api', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
