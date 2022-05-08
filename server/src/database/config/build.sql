BEGIN;

DROP TABLE IF EXISTS users, projects, sections, tasks, user_tasks, user_projects, activity CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL UNIQUE,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  phoneNumber VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  birthDate DATE,
  bio VARCHAR(255)
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL
);

CREATE TABLE sections (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  projectId INTEGER NOT NULL,
  FOREIGN KEY (projectId) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  priority VARCHAR(255),
  endDate DATE,
  status VARCHAR(255),
  sectionId INTEGER NOT NULL,
  FOREIGN KEY (sectionId) REFERENCES sections(id) ON DELETE CASCADE
);

CREATE TABLE user_tasks (
  id SERIAL PRIMARY KEY,
  userId INTEGER NOT NULL,
  taskId INTEGER NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (taskId) REFERENCES tasks(id) ON DELETE CASCADE
);

CREATE TABLE user_projects (
  id SERIAL PRIMARY KEY,
  userId INTEGER NOT NULL,
  projectId INTEGER NOT NULL,
  role VARCHAR(255) NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (projectId) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE activity (
  id SERIAL PRIMARY KEY,
  userId INTEGER NOT NULL,
  projectId INTEGER NOT NULL,
  sectionId INTEGER NOT NULL,
  taskId INTEGER NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  action VARCHAR(255) NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (projectId) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (sectionId) REFERENCES sections(id) ON DELETE CASCADE,
  FOREIGN KEY (taskId) REFERENCES tasks(id) ON DELETE CASCADE
);


COMMIT;