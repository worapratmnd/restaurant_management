-- rma.recipe definition

CREATE TABLE `recipe` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `amount` decimal(10,0) NOT NULL DEFAULT '0',
  `status` varchar(255) NOT NULL DEFAULT 'A',
  `created_at` datetime NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- rma.table_management definition

CREATE TABLE `table_management` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'A',
  `created_at` datetime NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- rma.users definition

CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- rma.`order` definition

CREATE TABLE `order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `table_id` bigint DEFAULT NULL,
  `total_amount` decimal(10,0) DEFAULT NULL,
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'N',
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_table_management_FK` (`table_id`),
  CONSTRAINT `order_table_management_FK` FOREIGN KEY (`table_id`) REFERENCES `table_management` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- rma.order_item definition

CREATE TABLE `order_item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `recipe_id` bigint NOT NULL,
  `order_id` bigint NOT NULL,
  `quantity` int DEFAULT NULL,
  `amount` decimal(10,0) DEFAULT NULL,
  `total_amount` decimal(10,0) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_item_order_FK` (`order_id`),
  KEY `recipe_id` (`recipe_id`),
  CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`),
  CONSTRAINT `order_item_order_FK` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;






INSERT INTO recipe (name,amount,status,created_at,created_by,updated_at,updated_by) VALUES
	 ('ข้าวหน้าเนื้อ',85,'O','2024-04-15 11:45:52',NULL,'2024-04-15 14:50:38',NULL),
	 ('ข้าวต้มปลากระพง',65,'A','2024-04-15 13:11:10',NULL,'2024-04-15 13:11:10',NULL),
	 ('แกงไตปลา',95,'A','2024-04-15 14:43:02',NULL,'2024-04-15 14:43:38',NULL);


INSERT INTO table_management (name,status,created_at,created_by,updated_at,updated_by) VALUES
	 ('โต๊ะกลมริมหน้าต่าง No.1','R','2024-04-15 04:24:27',NULL,'2024-04-15 14:18:16',NULL),
	 ('โต๊ะขนาดใหญ่ No.1','A','2024-04-15 04:25:42',NULL,'2024-04-15 14:18:03',NULL),
	 ('โต๊ะกลมริมหน้าต่าง No.2','A','2024-04-15 14:40:12',NULL,'2024-04-15 14:40:12',NULL),
	 ('No.5','A','2024-04-17 16:05:50','woraprat','2024-04-17 16:10:54','woraprat');


INSERT INTO rma.users (username,name,password,created_at,created_by,updated_at,updated_by) VALUES
	 ('admin','Admin','$2b$10$aSVjDEiBzILS57C0tduqRuxEJUugbTE7rkxeZmtJlsa0rRmLA/d2m','2024-04-17 16:35:20','system','2024-04-17 16:35:20','system');

