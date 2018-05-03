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
                    "exercises"."id" as "exercises.id"
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


// POST a new workout to the workout table
router.post('/', (req, res) => {
    console.log(req.body);
    if (req.isAuthenticated()) {        
        let workout = req.body;
        let queryText = `INSERT INTO "workouts" (exercise_id, weight, sets, reps, length, details, person_id) 
                        VALUES($1, $2, $3, $4, $5, $6, $7)`;
        pool.query(queryText, [workout.exercise, workout.weight, workout.sets, workout.reps, workout.length, workout.details, req.user.id] ).then((result)=>{
            res.sendStatus(200);
        }).catch((error)=>{
            console.log('error posting workout', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

//removes a workout from list
router.delete('/:id', (req, res)=>{
    console.log('in DELETE at server', req.params.id);
    if (req.isAuthenticated()) {
        const queryText = `DELETE FROM workouts WHERE id = $1`;
        pool.query(queryText, [req.params.id])
        .then((result)=> {
            res.sendStatus(200)
        }).catch((error)=>{
            console.log('error delete at server', error);
            res.sendStatus(500)
        });
    } else {
        res.sendStatus(403)
    }
});

//marks a workout as a favorite
router.put('/:id', (req, res)=>{
    console.log('FAV at server', req.params.id);
    if (req.isAuthenticated()) {
        const queryText = `UPDATE workouts SET "favorite" = NOT favorite WHERE "id" = $1`;
        pool.query(queryText, [req.params.id])
        .then((result)=>{
            res.sendStatus(200)
        }).catch((error)=>{
            console.log('FAV at server', error);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403)
    }
});




module.exports = router;