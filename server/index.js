const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

// Docker File for building a Docker image

// FROM node:12 // Layer1

// WORKDIR /app // Layer2

// COPY package*.json ./ // Layer 3

// RUN npm install // Layer 4

/* we want docker to install node_modules so we need a .dockerignore file
   //.dockerignore
   node_modules
*/

// COPY . .

// ENV PORT=8080

// EXPOSE 8080

// CMD ["npm", "start"]


/* Terminal */

// docker build -t name:app
// Successfully built .... img idif successful

// docker run [img id]

/* Implement portforwarding Local:Container*/
// docker run -p 5000:8080 [img id]