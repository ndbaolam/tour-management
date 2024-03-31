create table tour_management.tours_categories(
    tour_id int,
    category_id int,
    primary key (tour_id, category_id),
    foreign key(category_id) references tour_management.categories(id),
    foreign key(tour_id) references tour_management.tours(id)
);