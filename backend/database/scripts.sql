create database template;
use template;

drop table if exists users;
drop table if exists roles;
drop table if exists company;

create table roles (
    id_role int primary key auto_increment,
    description varchar(50)
);

insert into roles values
(null, "user"),
(null, "admin");

create table company (
    id_company int primary key auto_increment,
    name varchar(50),
    location varchar(50)
);

create table users (
    id_user int primary key auto_increment,
    user varchar(50),
    email varchar(50),
    fullname varchar(50),
    password varchar(250),
    fk_role int,
    fk_company int,
    foreign key (fk_role) references roles(id_role),
    foreign key (fk_company) references company(id_company)
);