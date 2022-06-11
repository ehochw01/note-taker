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
const fs = require('fs');
const noteData = require('./db/db.json');
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

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
app.get('/api/notes', (req, res) => {
    // read db.json and return it's contents as JSON
    console.info(`${req.method} request received to get notes`);
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).json(err);
        } else {
            console.log(data);
            res.status(201).json(JSON.parse(data));
        }
      });
});

// POST /api/notes should receive a new note to save on the request body
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;
    
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid()
            // give each note a unique id when it's saved

        }
        // add the note to the db.json file
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
              console.error(err);
            } else {
              const parsedNotes = JSON.parse(data);
              parsedNotes.push(newNote);
      
              // Write updated notes back to the file
              fs.writeFile(
                './db/db.json',
                JSON.stringify(parsedNotes, null, 4),
                (writeErr) =>
                  writeErr
                    ? console.error(writeErr)
                    : console.info('Successfully updated reviews!')
              );
            }
          });

        // return the new note to the client
        const response = {
            status: 'success',
            body: newNote,
          };
      
        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting review');
    }

});


// deleteNote delete request, bonus

app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT} 🚀`)
);