/*
Navicat MySQL Data Transfer

Source Server         : windows-mysql
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : ming-lie

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2019-04-02 22:11:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for ming_mysql_mq_config
-- ----------------------------
DROP TABLE IF EXISTS `ming_mysql_mq_config`;
CREATE TABLE `ming_mysql_mq_config` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `topic` varchar(255) DEFAULT NULL,
  `topic_name` varchar(255) DEFAULT NULL,
  `consumer` varchar(255) DEFAULT NULL,
  `status` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ming_mysql_mq_config
-- ----------------------------
INSERT INTO `ming_mysql_mq_config` VALUES ('30', 'topic01', 'topic01name', '[\"http://localhost:11112/topic01Listener\"]', null);
INSERT INTO `ming_mysql_mq_config` VALUES ('31', 'topic02', 'topic02name', '[\"http://localhost:11112/topic02Listener\"]', null);
