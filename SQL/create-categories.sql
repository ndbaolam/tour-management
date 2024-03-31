create table tour_management.categories(
	id int not null auto_increment,
    title varchar(255) not null,
    image varchar(500),
    description longtext,
    status varchar(20),
    position int,
    slug varchar(255) not null,
    deleted boolean,
    deleteAt timestamp null,
    createAt timestamp null,
    updateAt timestamp null,
    primary key (id)
)