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


//GET to users that returns a list of users
server.get ('/users', (req, res) => {
    db.find()
    .then (users => {
        res.status(200).json(hubs);
    })
    .catch(err =>{
        console.log('error', err);
        res.status(500).json({error: 'The users information could not be retrieved.'})
    })
});




//gets uid and returns the user at that ID
server.get('/users/:id', (req, res) => {


    const userId = req.params.id;
    db.findById(userId)
    .then(user => {
        if(!user){

            res.status(404).json({message: 'The user with the specified ID does not exist.'})
        }
        else {
            res.status(200).json(user);

        }       

    })
    .catch(error => {
        res.status(500).json({message: 'The user information could not be retrieved.'});
    })

});



