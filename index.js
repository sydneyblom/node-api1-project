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
server.get ('/api/users', (req, res) => {
    db.find()
    .then (users => {
        res.status(200).json(users);
    })
    .catch(err =>{
        console.log('error', err);
        res.status(500).json({error: 'The users information could not be retrieved.'})
    })
});




//gets uid and returns the user at that ID
server.get('/api/users/:id', (req, res) => {


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

server.post ('/api/users', (req,res) =>{
        const userData = req.body;
        //if missing users name or bio
        if (!userData.bio || !userData.name){
            res.status(400).json({ errorMessage: 'Please provide name and bio for the user.'})
        }
        else {
        //cretes a user if name and bio are there
            db.insert(userData)
            .then (user=> {
                res.status(201).json(user)
            })
        .catch(err=>{
        //catches error
            res.status(500).json({message: 'There was an error while saving the user to the database'})
        })
        }
    });

 server.put ('/api/users/:id', (req,res)=>{
     const id = req.params.id;
     const userInformation = req.body;
     if (!userInformation.name || !userInformation.bio) {
     res.status(400).json ({Message: 'Please provide name and bio for the user.'})
    }else {
        db.update(id, userInformation)
        .then(user=> {
            if (!user) {
                res.status(404).json ({message: 'The user with the specified ID does not exist.'})
            } else {
                db.findById(id)
                .then (user => {
                    res.status(200).json({user});
                })
            }
        }) 
            .catch(err=>{
            //catches error
                res.status(500).json({message:'The user information could not be modified'})
            })
        
    }

 })
    
server.delete('/api/users/:id', (req, res)=>{
const id =req.params.id;
db.remove(id)
.then(users => {
    if(users) {
res.status(200).json(users);
    }
    else {
        res.status(404).json({message: 'The user with the specified ID does not exist.'});
    }
})
.catch(error=>{
    res.status(500).json({error: 'The user could not be removed.'})
})
})



    const port = 8000; // localhost:8000
    server.listen(port, () => console.log('\n=== API on port 8000 ===\n'));