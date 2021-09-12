// call variables to connect dependency path
const express = require ('express');
const fs = require('fs');
// Executing the function stored in express variable
// And storing the result into app variable 
const app = express()
// file imports
const path = require('path');
// use port 3000 unless there exists a preconfigured port
const PORT = process.env.PORT || 3000;
// variable connect to json file
const {notes} = require('./Develop/db/db.json');
const http = require('http');
// new router to handle request
const router = require('express').Router();
// add middle ware
app.use(express.urlencoded({extended:"true"}));
app.use(express.json());
app.use(express.static('./Develop/public'))
app.get('/api/notes', (req,res)=>{
  res.json(notes);
});
app.post('/api/notes', (req, res)=>{
  req.body.id = notes.length.toString();
  const note = req.body;
  notes.push(note)
  fs.writeFileSync(
    path.join(__dirname, "./Develop/db/db.json"),
    JSON.stringify({notes:notes}, null, 2)
  );
  res.json(note)
});
app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname,'./Develop/public/index.html'));
});
app.get('/notes', (req, res)=>{
  res.sendFile(path.join(__dirname,"./Develop/public/notes.html"));
});

app.listen(PORT, ()=>{
  console.log(`API available on port ${PORT}`);
});

