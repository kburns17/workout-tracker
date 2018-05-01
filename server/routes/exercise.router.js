const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Adds a new 'exercise type' to the exercise table so it can be found in workouts dropdown
router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        let querytext = `INSERT INTO "exercises" ("exercise") VALUES ($1)`;
        pool.query(querytext, [req.body.exercise]).then((result) => {
            res.sendStatus(200)
        }).catch((error)=> {
            console.log(error);  
           res.sendStatus(500); 
        })
    } else {
        res.sendStatus(403);
    }
});


// router.get('/', (req, res)=>{

// })




module.exports = router;