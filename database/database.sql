create table account2 (
    id int(50) not null Primary Key Auto_increment,
    email varchar(100) not null, 
    password varchar(200) not null, 
    firstname varchar(100) not null, 
    lastname varchar(100) not null, 
).Engine InnoDB charset=utf8;


create table book (
    Bookid int(50) not null Primary Key Auto_increment,
    Bookname varchar(100) not null, 
    imagebook varchar(200) not null, 
    status varchar(100) not null,  
).Engine InnoDB charset=utf8;


create table borrow (
    Bookid int(30) not null Primary Key Auto_increment,
    firstname varchar(100) not null, 
    lasttname varchar(100) not null, 
    Bookid int(100) not null,
    Bookname varchar(100) not null,
    dateBorrow varchar(50) not null, 
    status enum('Borrow','Return') not null Default 'Borrow',  
).Engine InnoDB charset=utf8;


create table history (
    id int(30) not null Primary Key Auto_increment,
    firstname varchar(100) not null, 
    lasttname varchar(100) not null, 
    Bookname varchar(100) not null,
    dateBorrow varchar(50) not null, 
    dateReturn varchar(50) not null, 
    status enum('Borrow','Return') Default 'Returned' not null,  
).Engine InnoDB charset=utf8;




