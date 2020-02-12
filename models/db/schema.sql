CREATE DATABASE IF NOT EXISTS galleristic;
USE galleristic;

CREATE TABLE artist
(id int AUTO_INCREMENT,
	username varchar(20),
	fullname varchar(20),
	password varchar(128),
	PRIMARY KEY(id)
);

CREATE TABLE users
(id int AUTO_INCREMENT,
	username varchar(20),
	fullname varchar(20),
	password varchar(128),
	PRIMARY KEY(id)
);

select * from users;
