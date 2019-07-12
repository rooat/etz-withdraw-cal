-- MySQL dump 10.13  Distrib 5.7.25, for osx10.14 (x86_64)
--
-- Host: localhost    Database: eth_with_db
-- ------------------------------------------------------
-- Server version	5.7.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blocknum`
--

DROP TABLE IF EXISTS `blocknum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blocknum` (
  `e_id` int(8) NOT NULL AUTO_INCREMENT,
  `nettype` varchar(10) NOT NULL COMMENT '网络类型',
  `blocknumber` varchar(20) NOT NULL COMMENT '最新区块高度',
  `timestamps` varchar(20) NOT NULL COMMENT '最后写入时间',
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36320 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `deposit_data`
--

DROP TABLE IF EXISTS `deposit_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deposit_data` (
  `e_id` int(8) NOT NULL AUTO_INCREMENT,
  `txhash` varchar(150) NOT NULL COMMENT 'hash',
  `blocknumber` varchar(20) NOT NULL COMMENT '区块高度',
  `state` int(1) NOT NULL,
  `valuex` varchar(30) NOT NULL,
  `address` varchar(50) NOT NULL,
  `timestamps` varchar(20) NOT NULL,
  `fromadd` varchar(50) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_data`
--

DROP TABLE IF EXISTS `user_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_data` (
  `e_id` int(8) NOT NULL AUTO_INCREMENT,
  `address` varchar(50) NOT NULL COMMENT '地址',
  `timestamps` varchar(20) NOT NULL COMMENT '时间',
  `state` int(2) NOT NULL COMMENT '状态',
  `path` varchar(50) NOT NULL,
  `mnemonic` varchar(150) NOT NULL,
  `valuex` decimal(10,4) NOT NULL,
  `privates` varchar(100) NOT NULL,
  `iscalculte` int(1) NOT NULL,
  `user_id` varchar(30) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=365 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `withdraw_data`
--

DROP TABLE IF EXISTS `withdraw_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `withdraw_data` (
  `e_id` int(8) NOT NULL AUTO_INCREMENT,
  `txhash` varchar(150) NOT NULL COMMENT 'hash',
  `timestamps` varchar(20) NOT NULL COMMENT '开始时间',
  `endtime` varchar(20) NOT NULL COMMENT '结束时间',
  `state` varchar(1) NOT NULL COMMENT '状态',
  `valuex` varchar(30) NOT NULL COMMENT '提现金额',
  `address` varchar(50) NOT NULL COMMENT '地址',
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-12 17:44:51
