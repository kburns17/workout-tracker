const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET workouts from DB to display on DOM
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
    let queryText = `SELECT "workouts"."id",
                    "workouts"."exercise_id",
                    "workouts"."weight",
                    "workouts"."sets",
                    "workouts"."reps",
                    "workouts"."length",
                    "workouts"."details",
                    "workouts"."favorite",
                    "workouts"."date_of_workout",
                    "workouts"."person_id",
                    "exercises"."exercise",
                    "exercises"."id" as "exercise.id"
                    FROM workouts JOIN exercises
                    ON workouts.exercise_id = exercises.id`;
        pool.query(queryText).then((result)=>{
            res.send(result.rows)
        }).catch((error)=>{
            console.log('error in GET workouts', error);
            res.sendStatus(500)
        });
    } else {
        res.sendStatus(403)
    }
});


//workout.exercise.id, 
//workout.user.id
// POST a new workout to the workout table
router.post('/', (req, res) => {
    console.log(req.body);
    if (req.isAuthenticated()) {        
        let workout = req.body;
        console.log(workout.exercise);

        let queryText = `INSERT INTO "workouts" (exercise_id, weight, sets, reps, length, details, person_id) 
                        VALUES($1, $2, $3, $4, $5, $6, $7)`;
        pool.query(queryText, [workout.exercise_id, workout.weight, workout.sets, workout.reps, workout.length, workout.details, req.user.id] ).then((result)=>{
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