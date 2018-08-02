const express = require('express');
const parser = require('body-parser');
const path = require('path');
const request = require('request');

const proxy = express();

//this is the proxy port
const port = 8000;
proxy.use(parser.json());
proxy.use(parser.urlencoded({extended: false}));

proxy.use(express.static(path.join(__dirname, './')))

//Getting the photo view component bundle 
proxy.get('/bundle.js/3001', (req, res) => {
  request('http://localhost:3001/bundle.js', (err, response, body) => {
    if(err) {
      console.log(err)
    } else {
      res.status(200).send(body);
    }
  })
})

//Getting the photo view component
proxy.use('/main', (req, res) => {
  request('http://localhost:3001/main', (err, response, body) => {
    if(err) {
      console.log(err)
    }
      res.status(200).send(body);
  })
})

proxy.get('/bundle.js/3000', (req, res) => {
  request('http://localhost:3000/bundle.js', (err, response, body) => {
    if(err) {
      console.log(err)
    } else {
      res.status(200).send(body);
    }
  })
})

proxy.use('/api/reviews', (req, res) => {
  request('http://localhost:3000/api/reviews', (err, response, body) => {
    if(err) {
      console.log(err)
    }
      res.status(200).send(body);
  })
})

proxy.get('/bundle.js/9001', (req, res) => {
  request('http://localhost:9001/bundle.js', (err, response, body) => {
    if(err) {
      console.log(err)
    } else {
      res.status(200).send(body);
    }
  })
})

proxy.use('/api/yelp', (req, res) => {
  request('http://localhost:9001/api/yelp', (err, response, body) => {
    if(err) {
      console.log(err)
    }
      res.status(200).send(body);
  })
})

proxy.get('/bundle.js/1337', (req, res) => {
  request('http://localhost:1337/bundle.js', (err, response, body) => {
    if(err) {
      console.log(err)
    } else {
      res.status(200).send(body);
    }
  })
})

proxy.use('/api/restaurantList', (req, res) => {
  request('http://localhost:1337/api/restaurantList', (err, response, body) => {
    if(err) {
      console.log(err)
    }
      res.status(200).send(body);
  })
})


proxy.listen(port, () => console.log(`Server is listening on port ${port}`));