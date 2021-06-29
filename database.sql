
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
	"release_date" DATE,
	"user_id" INT REFERENCES "user" NOT NULL
);

CREATE TABLE "genres" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL
);

INSERT INTO "genres" ("name")
VALUES ('Action');

INSERT INTO "genres" ("name")
VALUES ('Adventure');

INSERT INTO "genres" ("name")
VALUES ('Animation');

INSERT INTO "genres" ("name")
VALUES ('Biography');

INSERT INTO "genres" ("name")
VALUES ('Comedy');

INSERT INTO "genres" ("name")
VALUES ('Crime');

INSERT INTO "genres" ("name")
VALUES ('Documentary');

INSERT INTO "genres" ("name")
VALUES ('Drama');

INSERT INTO "genres" ("name")
VALUES ('Family');

INSERT INTO "genres" ("name")
VALUES ('Fantasy');

INSERT INTO "genres" ("name")
VALUES ('Film Noir');

INSERT INTO "genres" ("name")
VALUES ('History');

INSERT INTO "genres" ("name")
VALUES ('Horror');

INSERT INTO "genres" ("name")
VALUES ('Music');

INSERT INTO "genres" ("name")
VALUES ('Musical');

INSERT INTO "genres" ("name")
VALUES ('Mystery');

INSERT INTO "genres" ("name")
VALUES ('Romance');

INSERT INTO "genres" ("name")
VALUES ('Sci-Fi');

INSERT INTO "genres" ("name")
VALUES ('Short Film');

INSERT INTO "genres" ("name")
VALUES ('Sport');

INSERT INTO "genres" ("name")
VALUES ('Superhero');

INSERT INTO "genres" ("name")
VALUES ('Thriller');

INSERT INTO "genres" ("name")
VALUES ('War');

INSERT INTO "genres" ("name")
VALUES ('Western');

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
	"movie_id" INT REFERENCES "movies" NOT NULL,
	"genre_id" INT REFERENCES "genres" NOT NULL
);

CREATE TABLE "movies_directors" (
	"id" SERIAL PRIMARY KEY,
	"movie_id" INT REFERENCES "movies" NOT NULL,
	"director_id" INT REFERENCES "directors" NOT NULL
);

CREATE TABLE "movies_tags" (
	"id" SERIAL PRIMARY KEY,
	"movie_id" INT REFERENCES "movies" NOT NULL,
	"tag_id" INT REFERENCES "tags" NOT NULL
);