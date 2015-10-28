/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : tokenteam

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2015-10-28 16:47:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for app
-- ----------------------------
DROP TABLE IF EXISTS `app`;
CREATE TABLE `app` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_name` varchar(32) DEFAULT NULL COMMENT 'App名称',
  `android_url` varchar(64) DEFAULT NULL COMMENT 'Android',
  `ios_url` varchar(64) DEFAULT NULL COMMENT 'iOS',
  `wp_url` varchar(64) DEFAULT NULL COMMENT 'Windows Phone',
  `default_url` varchar(64) DEFAULT NULL,
  `app_short` varchar(16) DEFAULT NULL COMMENT 'app缩写',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of app
-- ----------------------------
INSERT INTO `app` VALUES ('1', '掌上理工大', 'com.wutnews.bus.main', 'AtmF5.i', '', 'http://app.wutnews.net/', 'iwut');
INSERT INTO `app` VALUES ('2', '理工发布', null, 'M33O5.i', null, 'http://lgfb.wutnews.net/', 'lgfb');