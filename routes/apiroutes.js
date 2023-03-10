const fs = require('fs');
const path = require ('path');
const {v4: uuidv4} = require('uuid');

module.exports = (app) => {
    const noteData = fs.readFileSync(path.join(__dirname, '../db/db.json'));
    const noteDataArr = JSON.parse(noteData);

app.get ('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
});

app.post('/api/notes', (req,res) => {
    const newNote = {title: req.body.title, text: req.body.text, id: uuidv4()};
    noteDataArr.push(newNote);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(noteDataArr));
    res.json(noteDataArr);
    return console.log("Added new note: "+newNote.id);
});

app.get('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const note = noteDataArr.find(note => note.id === noteId);
    res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const newNoteDataArr = noteDataArr.filter(note => note.id !== noteId);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(newNoteDataArr));
    res.json(newNoteDataArr);
});
    
}

