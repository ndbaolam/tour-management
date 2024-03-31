create table tour_management.orders_item(
	id int not null auto_increment,
    orderId int not null,
    tourId int not null,
    quantity int not null,
    price int not null,
    discount int,
    timeStart  timestamp not null,
    primary key(id),
    foreign key (orderId) references tour_management.orders(id),
    foreign key (tourId) references tour_management.tours(id)
);