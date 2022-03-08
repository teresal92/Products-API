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
app.get('/loaderio-bb64fe97e1129aad06aad89f82c5bb53', (req, res) => {
  res.send('loaderio-bb64fe97e1129aad06aad89f82c5bb53');
});

// routes
app.use('/products-api', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
