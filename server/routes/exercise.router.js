const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Adds a new 'exercise type' to the exercise table 
router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        let querytext = `INSERT INTO "exercises" (exercise, person_id) VALUES ($1, $2)`;
        pool.query(querytext, [req.body.exercise, req.user.id]).then((result) => {
            res.sendStatus(200)
        }).catch((error)=> {
            console.log(error);  
           res.sendStatus(500); 
        })
    } else {
        res.sendStatus(403);
    }
});

//GET exercises from DB so they can be displayed in add new exercise
router.get('/', (req, res)=>{
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM exercises WHERE "person_id" = $1`;
        pool.query(queryText , [req.user.id]).then((result)=>{
            res.send(result.rows)
        }).catch((error)=>{
            console.log('error in GET EXERCISES', error);
            res.sendStatus(500)
        });
    } else {
        res.sendStatus(403)
    }
});



module.exports = router;