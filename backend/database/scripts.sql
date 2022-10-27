create database template;
use template;

create table roles (
    id int primary key auto_increment,
    description varchar(50)
);

create table users (
    id int primary key auto_increment,
    user varchar(50),
    email varchar(50),
    fullname varchar(50),
    password varchar(250),
    fk_role int,
    foreign key (fk_role) references roles(id)
);