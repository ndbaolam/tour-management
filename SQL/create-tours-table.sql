create table tour_management.tours (
	id int not null auto_increment,
    title varchar(255) not null,
    code varchar(10),
    images longtext,
    price int,
    discount int,
    information longtext,
    schedule longtext,
    timeStart timestamp null,
    stock int,
    status varchar(20),
    position int,
    slug varchar(20) not null,
    deleted boolean,
    deletedAt timestamp null,
    createdAt timestamp null,
    updatedAt timestamp null,
    primary key (id)
);

alter table tour_management.tours
drop column deleteadAt,
add deletedAt timestamp null;

alter table tour_management.tours
drop column createAt,
add createdAt timestamp null;

alter table tour_management.tours
drop column updateAt,
add updatedAt timestamp null;

alter table tour_management.tours
drop column infomation,
add information longtext;

alter table tour_management.tours
drop column postion,
add position longtext;

INSERT INTO tour_management.tours (title, code, images, price, discount, information, schedule, timeStart, stock, status, position, slug, deleted, deletedAt, createdAt, updatedAt)
VALUES
('Tour Hạ Long', 'TOUR000001', '["https://backend.daca.vn/assets/tour/images/tour-ha-long.jpg", "https://backend.daca.vn/assets/tour/images/tour-ha-long-2.jpg", "https://backend.daca.vn/assets/tour/images/tour-ha-long-3.jpg"]', 1500000, 10, 'Duyệt thác, thăm đảo', 'Ngày 1: Duyệt thác\nNgày 2: Thăm đảo', '2023-01-15 08:00:00', 50, 'active', 1, 'tour-ha-long', false, NULL, NOW(), NOW()),
('Tour Đà Nẵng', 'TOUR000002', '["https://backend.daca.vn/assets/tour/images/tour-da-nang.jpg"]', 2000000, 15, 'Thăm cầu Rồng, bãi biển Mỹ Khê', 'Ngày 1: Cầu Rồng\nNgày 2: Bãi biển Mỹ Khê', '2023-02-10 09:30:00', 40, 'active', 2, 'chuyen-di-da-nang', false, NULL, NOW(), NOW()),
('Tour Nha Trang', 'TOUR000003', '["https://backend.daca.vn/assets/tour/images/tour-nha-trang.jpg"]', 1800000, 12, 'Tham quan Vinpearl, tắm biển', 'Ngày 1: Vinpearl\nNgày 2: Tắm biển', '2023-03-05 10:45:00', 60, 'active', 3, 'du-lich-nha-trang', false, NULL, NOW(), NOW()),
('Tour Sài Gòn', 'TOUR000004', '["https://backend.daca.vn/assets/tour/images/tour-sai-gon.jpg"]', 2200000, 18, 'Khám phá quận 1, thưởng thức ẩm thực', 'Ngày 1: Quận 1\nNgày 2: Thưởng thức ẩm thực', '2023-04-20 11:15:00', 30, 'active', 4, 'hanh-trinh-sai-gon', false, NULL, NOW(), NOW()),
('Tour Phú Quốc', 'TOUR000005', '["https://backend.daca.vn/assets/tour/images/tour-phu-quoc.jpeg"]', 2800000, 20, 'Dạo chợ đêm, tham quan hòn Móng Tay', 'Ngày 1: Chợ đêm\nNgày 2: Hòn Móng Tay', '2023-05-12 12:30:00', 45, 'active', 5, 'hanh-trinh-phu-quoc', false, NULL, NOW(), NOW()),
('Tour Đảo Ngọc Cô Tô', 'TOUR000006', '["https://backend.daca.vn/assets/tour/images/tour-dao-ngoc-co-to.jpg"]', 2500000, 15, 'Thăm làng chài, tắm biển', 'Ngày 1: Làng chài\nNgày 2: Tắm biển', '2023-06-08 13:45:00', 55, 'active', 6, 'dao-ngoc-co-to', false, NULL, NOW(), NOW()),
('Tour Khám Phá Huế', 'TOUR000007', '["https://backend.daca.vn/assets/tour/images/tour-hue.jpg"]', 1900000, 12, 'Tham quan đại cung điện, ngắm cầu Trường Tiền', 'Ngày 1: Đại cung điện\nNgày 2: Cầu Trường Tiền', '2023-07-25 14:00:00', 50, 'active', 7, 'kham-pha-hue', false, NULL, NOW(), NOW()),
('Tour Sapa', 'TOUR000008', '["https://backend.daca.vn/assets/tour/images/tour-sapa.jpg"]', 3000000, 25, 'Leo Fansipan, thăm thị trấn Sa Pa', 'Ngày 1: Leo Fansipan\nNgày 2: Thăm Sa Pa', '2023-08-18 15:30:00', 35, 'active', 8, 'doan-tham-hiem-sapa', false, NULL, NOW(), NOW()),
('Tour Vịnh Lan Hạ', 'TOUR000009', '["https://backend.daca.vn/assets/tour/images/tau-tour-vinh-lan-ha.jpg"]', 2600000, 18, 'Thăm đảo Quan Lạn, tắm biển Vân Đồn', 'Ngày 1: Đảo Quan Lạn\nNgày 2: Tắm biển Vân Đồn', '2023-09-10 16:15:00', 48, 'active', 9, 'vinh-lan-ha', false, NULL, NOW(), NOW()),
('Tour Miền Tây', 'TOUR000010', '["https://backend.daca.vn/assets/tour/images/tour-mien-tay.jpg"]', 1700000, 10, 'Thăm cánh đồng lúa, đi cồn', 'Ngày 1: Cánh đồng lúa\nNgày 2: Đi cồn', '2023-10-05 17:00:00', 42, 'active', 10, 'mien-tay-mat-nuoc', false, NULL, NOW(), NOW());

