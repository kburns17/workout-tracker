*PERSONAL WORKOUT ASSISTANT*
This application is meant to be used as a personal workout assistant. The user can add a new workout and its details to the app and view it, along with all the other workouts that have been added. They have the ability to mark a workout as a favorite and update the workout details if entered it incorrectly. An user can also delete a workout from the database if they choose. 


*BUILT WITH*
React-Redux, Express JS, Node JS, PostgreSQL,Material-UI, Sweetalert, Passport JS, Moment.js

*GETTING STARTED*



*PREREQUISITES*
This application will require React, Node JS and PostgreSQL to run

*INSTALLING*
Use the below PostgresQL tables:
CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);

CREATE TABLE workouts (
    "id" SERIAL PRIMARY KEY,
    "exercise_id" INT REFERENCES "exercises",
    "weight" INTEGER,
    "sets" INTEGER,
    "reps" INTEGER,
    "length" VARCHAR (80),
    "details" VARCHAR (240),
    "favorite" boolean default false,
    "date_of_workout" timestamp default current_timestamp,
    "person_id" INT REFERENCES "person"
);


CREATE TABLE exercises (
"id" serial primary key,
"exercise" varchar(80),
"person_id" INT REFERENCES "person"
);

