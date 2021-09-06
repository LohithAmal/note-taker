// call variables to connect dependency path

const express = require ('express');

// Executing the function stored in express variable
// And storing the result into app variable 
const app = express()

// adding path antive utility module
const path = require('path');
// file system module
const fs = require ('fs');

// use port 3000 unless there exists a preconfigured port
const PORT = process.env.PORT || 3000;

// variable connect to json file
const {notes} = require('./Develop/db/db.json');
const { request } = require('http');
const { response } = require('express');
// new router to handle request
const router = require('express').Router();

// add middle ware
app.use(express.urlencoded({extended:"true"}));
app.use(express.json());
app.use(express.static('./Develop/public'))
// this code will get notes from json file db
app.get('/api/notes', (request,response)=>{
  response.json(notes)
});

// this code will save notes to json
app.post('/api/notes', (request, response)=>{

  request.body.id = notes.length.toString();
  const note = request.body;
  notes.push(note)
  fs.writeFileSync(
    path.join(__dirname, "./Develop/db/db.json"),
    JSON.stringify({notes:notes}, null, 2)
  );
  response.json(note)
});
// connect the backend to frontend
app.get('/', (request,response)=>{
  response.sendFile(path.join(__dirname,'./Develop/public/index.html'));
});

app.get('/notes', (request, response)=>{
  response.sendFile(path.join(__dirname,"./Develop/public/notes.html"));
})

app.listen(PORT, ()=>{
  console.log(`server available on port ${PORT}`);
});

