CREATE TABLE address (
	id SERIAL PRIMARY KEY NOT NULL,
	unit_num TEXT,
	address1 TEXT,
	address2 TEXT,
	city TEXT,
	state TEXT,
	country TEXT,
	postal_code TEXT
);

CREATE TABLE cohort (
	id SERIAL PRIMARY KEY NOT NULL,
	name TEXT NOT NULL,
	current_module TEXT
);

CREATE TABLE users (
	id SERIAL PRIMARY KEY NOT NULL,
	address_id INTEGER REFERENCES address (id),
	cohort_id INTEGER REFERENCES cohort(id),
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL,
	is_instructor BOOLEAN DEFAULT(false),
  is_active BOOLEAN DEFAULT(true),
	is_admin BOOLEAN DEFAULT(false),
	image TEXT,
  phone TEXT
);

CREATE TABLE instructor_cohort (
	id SERIAL PRIMARY KEY NOT NULL,
	instructor_id INTEGER NOT NULL REFERENCES users (id),
	cohort_id INTEGER NOT NULL REFERENCES cohort (id)
);

CREATE TABLE subject (
	id SERIAL PRIMARY KEY NOT NULL,
	subject TEXT NOT NULL
);


CREATE TABLE question (
	id SERIAL PRIMARY KEY NOT NULL,
	subject_id INTEGER REFERENCES subject (id),
	type TEXT NOT NULL,
	difficulty SMALLINT, 
	question TEXT NOT NULL,
	answer TEXT NOT NULL, 
	option1 TEXT,
	option2 TEXT,
	option3 TEXT,
	option4 TEXT
);

CREATE TABLE quiz (
	id SERIAL PRIMARY KEY NOT NULL,
	subject_id INTEGER NOT NULL REFERENCES subject (id),
	created_by_id INTEGER NOT NULL REFERENCES users (id),
	created_at TIMESTAMP DEFAULT NOW(),
	difficulty SMALLINT,
	no_of_questions SMALLINT,
	questions INTEGER[],
	module TEXT,
	description TEXT
);

CREATE TABLE assigned_quiz (
	id SERIAL PRIMARY KEY NOT NULL,
	quiz_id INTEGER NOT NULL REFERENCES quiz (id),
	instructor_id INTEGER NOT NULL REFERENCES users (id),
	cohort_id INTEGER NOT NULL REFERENCES cohort (id),
	due_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE user_quiz_record (
	id SERIAL PRIMARY KEY NOT NULL,
	user_id INTEGER NOT NULL REFERENCES users (id),
	quiz_id INTEGER NOT NULL REFERENCES quiz (id),
	score INTEGER DEFAULT (0),
	incorrect_qs INTEGER[],
	date_taken DATE NOT NULL DEFAULT CURRENT_DATE
);

ALTER TABLE question ADD COLUMN is_active BOOLEAN DEFAULT(true);
