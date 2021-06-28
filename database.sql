
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "movies" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR(255) NOT NULL,
	"image" VARCHAR(255) NOT NULL,
	"description" TEXT NOT NULL,
	"release_date" DATE
);

CREATE TABLE "genres" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL
);

CREATE TABLE "directors" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL
);

CREATE TABLE "tags" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL
);

CREATE TABLE "movies_genres" (
	"id" SERIAL PRIMARY KEY,
	"movie_id" int REFERENCES "movies" NOT NULL,
	"genre_id" int REFERENCES "genres" NOT NULL
);

CREATE TABLE "movies_directors" (
	"id" SERIAL PRIMARY KEY,
	"movie_id" int REFERENCES "movies" NOT NULL,
	"director_id" int REFERENCES "directors" NOT NULL
);

CREATE TABLE "movies_tags" (
	"id" SERIAL PRIMARY KEY,
	"movie_id" int REFERENCES "movies" NOT NULL,
	"tag_id" int REFERENCES "tags" NOT NULL
);