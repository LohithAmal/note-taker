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



