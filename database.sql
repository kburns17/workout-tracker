CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);

CREATE TABLE workouts (
    "id" SERIAL PRIMARY KEY,
    "exercise" VARCHAR (80) NOT NULL,
    "weight" VARCHAR (80),
    "sets" INTEGER,
    "reps" INTEGER,
    "length" VARCHAR (80),
    "details" VARCHAR (240),
    "date_of_workout" timestamp default current_timestamp,
    "person_id" INT REFERENCES "person"
);