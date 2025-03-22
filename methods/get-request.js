const express = require('express');
const app = express();

module.exports = (req, res) => {
  console.log(req.url);

  switch (req.url) {
    case '/api/movies':
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(req.movies));
      break;

    default:
      if (req.url.startsWith('/api/movies/')) {
        console.log('Reached /api/movies/ case===========>>>>>');
        const urlParts = req.url.split('/');
        const movieId = urlParts[urlParts.length - 1];
        let movies = req.movies.filter(movie => movie.id === movieId);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(movies)); // Return the filtered movies
      } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Not Found' }));
      }
  }
};
