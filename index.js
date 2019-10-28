// implement your API here
// import express from 'express'; // ES Modules
const express = require('express');

const server = express(); //creates a server

//gets access to DB
const db = require('./data/db');

//middleware - teaches how to read JSON needed for post and put to work
server.use(express.json());

//configures server for get req
server.get('/',(req, res) =>{
    res.send("Server is working")
})

