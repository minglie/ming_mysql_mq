/*
Navicat MySQL Data Transfer

Source Server         : windows-mysql
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : ming-lie

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2019-04-02 22:11:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for ming_mysql_mq_message
-- ----------------------------
DROP TABLE IF EXISTS `ming_mysql_mq_message`;
CREATE TABLE `ming_mysql_mq_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `topic` varchar(255) DEFAULT NULL COMMENT '主题',
  `ip` varchar(255) DEFAULT NULL COMMENT 'ip',
  `body` varchar(255) DEFAULT NULL COMMENT '消息体',
  `request_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `status` varchar(255) DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=354 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ming_mysql_mq_message
-- ----------------------------
INSERT INTO `ming_mysql_mq_message` VALUES ('348', 'topic01', '::1', '65465465465465465', '2019-04-02 22:10:26', '1');
INSERT INTO `ming_mysql_mq_message` VALUES ('349', 'topic01', '::1', '65465465465465465', '2019-04-02 22:10:33', '1');
