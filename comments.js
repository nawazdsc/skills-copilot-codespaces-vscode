// create web server for comments
// 1. require express
// 2. create express application
// 3. create a route for GET /comments
// 4. create a route for POST /comments
// 5. start server on port 3000

// 1. require express
const express = require('express');
const fs = require('fs');
const path = require('path');

// 2. create express application
const app = express();

// 3. create a route for GET /comments
app.get('/comments', (req, res) => {
  const commentsPath = path.join(__dirname, 'comments.json');
  fs.readFile(commentsPath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(JSON.parse(data));
  });
});

// 4. create a route for POST /comments
app.use(express.json());
app.post('/comments', (req, res) => {
  const commentsPath = path.join(__dirname, 'comments.json');
  fs.readFile(commentsPath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    const comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile(commentsPath, JSON.stringify(comments, null, 2), err => {
      if (err) {
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(201).send('Comment added');
    });
  });
});

// 5. start server on port 3000
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
