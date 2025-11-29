-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 29, 2025 at 05:13 AM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quanlytour`
--

-- --------------------------------------------------------

--
-- Table structure for table `tour`
--

DROP TABLE IF EXISTS `tour`;
CREATE TABLE IF NOT EXISTS `tour` (
  `matour` varchar(10) NOT NULL,
  `tentour` varchar(50) NOT NULL,
  `diemdi` varchar(50) NOT NULL,
  `diemden` varchar(50) NOT NULL,
  `loaitour` varchar(20) NOT NULL,
  `hinhdaidien` varchar(100) NOT NULL,
  `motangan` varchar(400) NOT NULL,
  `motachitiet` varchar(2000) NOT NULL,
  `ngaydi` date NOT NULL,
  `ngayve` date NOT NULL,
  `thoiluong` varchar(20) NOT NULL,
  `giavenguoilon` int NOT NULL,
  `giavetreem` int DEFAULT NULL,
  `soluong` int NOT NULL,
  PRIMARY KEY (`matour`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tour`
--

INSERT INTO `tour` (`matour`, `tentour`, `diemdi`, `diemden`, `loaitour`, `hinhdaidien`, `motangan`, `motachitiet`, `ngaydi`, `ngayve`, `thoiluong`, `giavenguoilon`, `giavetreem`, `soluong`) VALUES
('1', 'Đà Lạt', 'tphcm', 'dalat', 'dulich', '1764392577383-da-lat.jpg', 'Đà Lạt chill chill', 'Đà Lạt chill chill', '2025-11-29', '2025-12-07', '8 ngày', 1000000, 900000, 15),
('2', 'Tour Bến Tre', 'tphcm', 'bentre', 'nghiduong', '1764392953027-ben-tre.jpg', 'Về Bến Tre miền Tây', 'Bến Tre - miền Tây sông nước', '2025-12-04', '2025-12-08', '4 ngày', 500000, 350000, 26),
('3', 'Tour Vũng Tàu', 'bentre', 'vungtau', 'nghiduong', '1764393035415-vung-tau.jpg', 'Đi tắm biển ở Vũng Tàu', 'Đi tắm biển ở Vũng Tàu, ăn hải sản tươi ngon', '2025-12-06', '2025-12-07', '1 ngày', 250000, 120000, 15);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
