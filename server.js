/*
GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a Save icon appears in the navigation at the top of the page
WHEN I click on the Save icon
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column
WHEN I click on the Write icon in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
*/

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// html routes
// GET /notes should return the notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);
// GET * should return the index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// GET /api/notes should read the db.json and return all saved notes as JSON

// POST /api/notes should receive a new note to save on the request body
// add it to the db.json file
// give each note a unique id when it's saved using an npm package

// return the new note to the client

// deleteNote delete request

app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT} 🚀`)
);