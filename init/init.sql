CREATE DATABASE IF NOT EXISTS board_db;
USE board_db;

DROP TABLE IF EXISTS `keyword_alert`;
DROP TABLE IF EXISTS `comment`;
DROP TABLE IF EXISTS `post`;

CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `author_name` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
);

CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `postId` int DEFAULT NULL,
  `parent_comment_id` int DEFAULT NULL,
  `content` varchar(255) NOT NULL,
  `author_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_94a85bb16d24033a2afdd5df060` (`postId`),
  KEY `FK_ac69bddf8202b7c0752d9dc8f32` (`parent_comment_id`),
  CONSTRAINT `FK_94a85bb16d24033a2afdd5df060` FOREIGN KEY (`postId`) REFERENCES `post` (`id`),
  CONSTRAINT `FK_ac69bddf8202b7c0752d9dc8f32` FOREIGN KEY (`parent_comment_id`) REFERENCES `comment` (`id`)
);

CREATE TABLE `keyword_alert` (
  `id` int NOT NULL AUTO_INCREMENT,
  `keyword` varchar(255) NOT NULL,
  `author_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);