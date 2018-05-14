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