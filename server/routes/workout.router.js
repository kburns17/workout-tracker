const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

//workout.exercise.id, 
//workout.user.id
// POST a new workout to the workout table
router.post('/', (req, res) => {
    console.log(req.body);
    
    if (req.isAuthenticated()) {
        let workout = req.body;
        let queryText = `INSERT INTO "workouts" (weight, sets, reps, length, details, person_id) 
                        VALUES($1, $2, $3, $4, $5, $6)`;
                        // `INSERT INTO "workouts" (exercise_id, weight, sets, reps, length, details, person_id) 
                        // VALUES($1, $2, $3, $4, $5, $6, $7)`;
        pool.query(queryText, [workout.weight, workout.sets, workout.reps, workout.length, workout.details, req.user.id] ).then((result)=>{
            res.sendStatus(200);
        }).catch((error)=>{
            console.log('error posting workout', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;