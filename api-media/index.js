const express = require('express');
const fileUpload = require('./lib/index');
const cors = require('cors');
const app = express();
const path = require('path');
const uniqid = require('uniqid');

const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
// default options
app.use(fileUpload());

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.post('/upload', function(req, res) {
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  const { name, mv } = req.files.sampleFile;
  
  const id = uniqid('', `.${name.split('.').pop()}`);

  uploadPath = __dirname + '/uploads/' + id;

  mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    const url = `http://localhost:${4225}/static/${id}`
    res.json({ url, name });
  });
});

app.use('/static', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, function() {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});
