//Requiring Packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Configuring Environment Variables
require('dotenv').config();

//Setting up the server
const app = express();
const port = process.env.PORT || 5000;

//Server Middleware (To get info from outside the server i.e. Cross-Origin Resource Sharing)
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Connecting to mongoDB Atlas Database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser:true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB Database Connection Established successfully.'));

//CRUD on Database
const Note = require('./models/note.model');

//Request: Getting Notes
app.get('/', (req, res) => {
    Note.find()
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json('Error: '+err));
});

//Request: Posting Notes
app.post('/', (req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    const newNote = new Note({
        title:title,
        content:content
    });

    newNote.save()
    .then(()=> res.send('Note Successfully Added.'))
    .catch(err => res.status(400).json('Error: '+err));
});

//Request: Deleting Notes
app.delete('/:id', (req, res) => {
    Note.findByIdAndRemove(req.params.id)
    .then(() => res.send('Note Deleted'))
    .catch(err => res.status(400).json('Error: '+err));
});


//Setting up the server to listen
app.listen(port, () => console.log(`Server is running on port: ${port}`));