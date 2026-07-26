-- Tạo database
CREATE DATABASE demo_1
-- Tạo database nhưng kiểm tra điều kiện là không tồn tại mới tạo database
CREATE DATABASE IF NOT EXISTS sql_basic 

-- Xóa database
DROP DATABASE demo_1
DROP DATABASE IF EXISTS sql_basic 	

-- Tạo table
--ví dụ: tạo ra bảng user có các cột là username, password, avatar, id
--  dùng `` để  bỏ thuộc tính đã trùng với keyword 
-- phím tắt reload ctrl + r
-- phím tắt để chạy ctrl + enter
CREATE TABLE IF NOT EXISTS `user` (
	`id` INT AUTO_INCREMENT PRIMARY KEY, 
	`username` VARCHAR(255),
	`password` VARCHAR(255),
	`avatar` TEXT,
	`age` INT
)

-- Đổi tên bảng
RENAME TABLE `user` TO 	`Users`

-- Xóa cột 
ALTER TABLE `Users` DROP COLUMN `age`

-- Thêm cột
ALTER TABLE `Users` ADD COLUMN `googleID` VARCHAR(255)

-- Ràng buộc
-- Ví dụ: nếu cột description không có dữ liêu khởi tạo thì lưu giá trị là "Chưa có thông tin"
CREATE TABLE IF NOT EXISTS `Foods` (
	`id` INT AUTO_INCREMENT PRIMARY KEY,
	`name` VARCHAR(255),
	`description` VARCHAR(255) DEFAULT "Chưa có thông tin"
)


-- Thêm ràng buộc cho cột
-- Chưa tạo thì cứ add column, nếu có ròi thì  modify(1 cột) hoặc modifies(nhiều cột)
ALTER TABLE `Users` ADD COLUMN `email` VARCHAR(255) NOT NULL


-- Thêm dữ liệu
INSERT INTO `Users` (`username`, `email`) VALUE
('Nguyễn Văn A', 'nguyenvana@gmail.com'),
('Nguyễn Văn B', 'nguyenvanb@gmail.com'),
('Nguyễn Văn C', 'nguyenvanc@gmail.com'),
('Nguyễn Văn D', 'nguyenvand@gmail.com'),
('Nguyễn Văn E', 'nguyenvane@gmail.com')



INSERT INTO `Foods` (`name`, `description`) VALUES
('Phở bò', 'Món phở truyền thống Việt Nam với nước dùng đậm đà'),
('Bún bò Huế', 'Đặc sản Huế với vị cay và nước dùng thơm ngon'),
('Cơm tấm', 'Cơm tấm sườn bì chả đặc trưng Sài Gòn'),
('Bánh mì', 'Bánh mì kẹp thịt, pate và rau củ'),
('Gỏi cuốn', 'Cuốn tôm thịt với rau sống và bánh tráng'),
('Bánh xèo', 'Bánh xèo giòn nhân tôm thịt và giá đỗ'),
('Hủ tiếu Nam Vang', 'Hủ tiếu với nước dùng ngọt thanh'),
('Mì Quảng', 'Đặc sản Quảng Nam với nước dùng sệt'),
('Bún chả', 'Bún ăn kèm chả nướng và nước mắm chua ngọt'),
('Chả giò', 'Chả giò chiên giòn nhân thịt và rau củ');





-- Basic query (relationship)
SELECT * FROM `Users`

SELECT `username`, `email` FROM `Users`

SELECT * FROM `Users` WHERE `id` = 4

-- Đặt tên phụ cho cột
SELECT `username` AS `fullname`, `email` FROM `Users`

-- DROP TABLE `user-type`
-- CREATE, INSERT DU LIEU VAO CAC BAN CO CHUA KHOA CHINH THUC
CREATE TABLE IF NOT EXISTS `user_type`(
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`name` VARCHAR(255)
)

-- DROP TABLE `Users`
CREATE TABLE IF NOT EXISTS `Users`(
	`id` INT AUTO_INCREMENT PRIMARY KEY, 
	`username` VARCHAR(255),
	`password` VARCHAR(255),
	`avatar` TEXT,
	`age` INT,
	`user_type_id` INT,
	FOREIGN KEY(`user_type_id`) REFERENCES `user_type`(`id`)
)
 INSERT INTO `user_type` (`name`) VALUES
('Admin'),
('Manager'),
('Employee'),
('Customer'),
('Guest');

INSERT INTO `Users` (`username`, `password`, `avatar`, `age`, `user_type_id`) VALUES
('admin', '123456', 'https://i.pravatar.cc/150?img=1', 30, 1),
('john', '123456', 'https://i.pravatar.cc/150?img=2', 25, 2),
('jane', '123456', 'https://i.pravatar.cc/150?img=3', 28, 2),
('mike', '123456', 'https://i.pravatar.cc/150?img=4', 35, 3),
('emily', '123456', 'https://i.pravatar.cc/150?img=5', 22, 2),
('david', '123456', 'https://i.pravatar.cc/150?img=6', 40, 3),
('sophia', '123456', 'https://i.pravatar.cc/150?img=7', 27, 2),
('daniel', '123456', 'https://i.pravatar.cc/150?img=8', 31, 3),
('olivia', '123456', 'https://i.pravatar.cc/150?img=9', 24, 2),
('alex', '123456', 'https://i.pravatar.cc/150?img=10', 29, 1);

-- xoa table /row data thi phai xóa table/row chứa FK trước

CREATE TABLE IF NOT EXISTS `orders`(
		`id` INT PRIMARY KEY AUTO_INCREMENT,
		`user_id` INT,
		`food_id` INT,
		FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`),
		FOREIGN KEY (`food_id`) REFERENCES `Foods`(`id`)
)

INSERT INTO `orders` (`user_id`, `food_id`) VALUES
(1,4),
(1,2),
(2,5),
(3,10),
(10,8),
(8,9)


-- ADVANCE QUERY
-- inner join: dùng khi lấy các cặp giá trị tồn tại của cả 2 bảng (cái giống nhau)
SELECT *
FROM orders
INNER JOIN `Users` ON `orders`.`user_id` = `Users`.`id`
INNER JOIN `Foods` ON `orders`.`food_id`= `Foods`.`id`


SELECT u.`username`, f.`name`, f.`description`
FROM orders o 
INNER JOIN `Users` u ON o.`user_id` = u.`id`
INNER JOIN `Foods` f ON o.`food_id`= f.`id`


-- left join/ right join: sử dụng tìm kiếm thông tin kể cả việc chưa hành động(khác nhau)
-- u,o,f la alias (ten phu) 
-- vi du: lay tat ca thong tin user neu co dat hang in ra neu khong in ra null
SELECT *
FROM Users u 
LEFT JOIN `orders` o ON u.`id` = o.`user_id`
LEFT JOIN `Foods` f ON o.`user_id`= f.`id`


SELECT u.`username`, f.`name`, f.`description`
FROM Users u 
LEFT JOIN `orders` o ON u.`id` = o.`user_id`
LEFT JOIN `Foods` f ON o.`user_id`= f.`id`

-- from -> join -> on -> where -> select -> thứ tự chạy của sql

-- Tìm người đặt hàng nhiều nhất
-- phân tích:
-- 1. kiểm tra dữ liệu order tồn tại có mua hàng thì mới phát sinh order 
-- 2. Group by: nhóm những thông tin user giống sau rồi đếm số lần xuất hiện 
-- 3. count(), max(), min(), evarage()
-- 4. Order by: sắp xếp lại số lượng
-- 5. Limit 1: lấy người đầu

-- bước 1: lấy thông tin bảng orders và thêm thông tin users
SELECT u.`id`, o.`user_id`, u.`username` FROM orders o 
INNER JOIN `Users` u ON o.user_id = u.id 
-- lỗi: 
-- buoc 2: group by: thống kê / nhóm dòng dữ liệu
SELECT u.`id`, o.`user_id`, u.`username` FROM orders o 
INNER JOIN `Users` u ON o.user_id = u.id 
GROUP BY `user_id`

-- buoc 3: thống kê số lượng nhom dc
SELECT COUNT(o.`id`), o.`user_id`, u.`username` FROM orders o 
INNER JOIN `Users` u ON o.user_id = u.id 
GROUP BY `user_id`

-- buoc4: thong ke so luong mua hang bang GROUP BY (DESC(giam dan), ACS(TANG DAN)) - LIMIT (GIOI HAN DONG)
SELECT COUNT(o.`id`) AS `SO_LAN_MUA_HANG`, o.`user_id`, u.`username` FROM orders o 
INNER JOIN `Users` u ON o.user_id = u.id 
GROUP BY `user_id`
ORDER BY `SO_LAN_MUA_HANG` DESC
LIMIT 1




