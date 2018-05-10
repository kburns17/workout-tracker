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
                    ON workouts.exercise_id = exercises.id WHERE workouts.person_id = $1 ORDER BY date_of_workout DESC;`;
        pool.query(queryText, [req.user.id]).then((result)=>{
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

// marks a workout as a favorite
router.put('/favorite/:id', (req, res)=>{
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

router.put('/:id', (req, res)=>{
    console.log('Update at server', req.body);
    if (req.isAuthenticated()) {
        let workout = req.body;
        const queryText = `UPDATE workouts SET exercise_id = $1, weight = $2, sets = $3, reps = $4, length = $5, details = $6 WHERE "id" = $7`;
        pool.query(queryText, [workout.exercise_id, workout.weight, workout.sets, workout.reps, workout.length, workout.details, req.body.id])
        .then((result)=>{
            res.sendStatus(200)
        }).catch((error)=>{
            console.log('update at server', error);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403)
    }
});






module.exports = router;