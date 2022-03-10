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
app.get('/loaderio-b16920ddfcf58c1b205d9e9bdbb7f0e4', (req, res) => {
  res.send('loaderio-b16920ddfcf58c1b205d9e9bdbb7f0e4');
});

// routes
app.use('/products-api', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
