/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : tokenteam

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2015-10-26 22:45:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for shorturl
-- ----------------------------
DROP TABLE IF EXISTS `shorturl`;
CREATE TABLE `shorturl` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `short_url` varchar(8) DEFAULT NULL COMMENT '短网址',
  `origin_url` varchar(1024) DEFAULT NULL COMMENT '源网址',
  `title` varchar(64) DEFAULT NULL COMMENT '网址说明',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_ip` varchar(16) DEFAULT NULL COMMENT '用户IP',
  PRIMARY KEY (`id`),
  UNIQUE KEY `check_short` (`short_url`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
