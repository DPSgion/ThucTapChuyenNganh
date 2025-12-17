-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 17, 2025 at 03:48 PM
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
-- Table structure for table `dia_diem`
--

DROP TABLE IF EXISTS `dia_diem`;
CREATE TABLE IF NOT EXISTS `dia_diem` (
  `ma_dia_diem` int NOT NULL AUTO_INCREMENT,
  `ten_dia_diem` varchar(100) NOT NULL,
  `mota` text NOT NULL,
  `hinhdaidien` varchar(255) NOT NULL,
  `trang_thai` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`ma_dia_diem`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `dia_diem`
--

INSERT INTO `dia_diem` (`ma_dia_diem`, `ten_dia_diem`, `mota`, `hinhdaidien`, `trang_thai`) VALUES
(1, 'Phú Quốc', 'Phú Quốc rất đẹp', '1765969450466-phu-quoc.jpg', 1),
(2, 'Bến Tre', 'Bến Tre chill chill', '1765969645265-ben-tre.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `hinh_dia_diem`
--

DROP TABLE IF EXISTS `hinh_dia_diem`;
CREATE TABLE IF NOT EXISTS `hinh_dia_diem` (
  `ma_hinh` int NOT NULL AUTO_INCREMENT,
  `ma_dia_diem` int NOT NULL,
  `duong_dan` varchar(255) NOT NULL,
  PRIMARY KEY (`ma_hinh`),
  KEY `ma_dia_diem` (`ma_dia_diem`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hinh_dia_diem`
--

INSERT INTO `hinh_dia_diem` (`ma_hinh`, `ma_dia_diem`, `duong_dan`) VALUES
(6, 1, '1765968761352-ben-tre.jpg'),
(7, 1, '1765968761352-da-lat.jpg'),
(8, 1, '1765968761357-phan-thiet.jpg'),
(9, 1, '1765968761358-phu-quoc.jpg'),
(10, 1, '1765968761359-vung-tau.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `hinh_khach_san`
--

DROP TABLE IF EXISTS `hinh_khach_san`;
CREATE TABLE IF NOT EXISTS `hinh_khach_san` (
  `ma_hinh_anh` int NOT NULL AUTO_INCREMENT,
  `ma_khach_san` int NOT NULL,
  `duong_dan` varchar(255) NOT NULL,
  PRIMARY KEY (`ma_hinh_anh`),
  KEY `ma_khach_san` (`ma_khach_san`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hinh_khach_san`
--

INSERT INTO `hinh_khach_san` (`ma_hinh_anh`, `ma_khach_san`, `duong_dan`) VALUES
(4, 2, '1765984672863-RubyPhuQuoc-1.png'),
(5, 2, '1765984672892-RubyPhuQuoc-2.png'),
(6, 2, '1765984672895-RubyPhuQuoc-3.png'),
(7, 1, '1765986293153-CielRose-1.jpg'),
(8, 1, '1765986293153-CielRose-2.jpg'),
(9, 1, '1765986293154-CielRose-3.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `hinh_phuong_tien`
--

DROP TABLE IF EXISTS `hinh_phuong_tien`;
CREATE TABLE IF NOT EXISTS `hinh_phuong_tien` (
  `ma_hinh` int NOT NULL AUTO_INCREMENT,
  `ma_phuong_tien` int NOT NULL,
  `duong_dan` varchar(255) NOT NULL,
  PRIMARY KEY (`ma_hinh`),
  KEY `ma_phuong_tien` (`ma_phuong_tien`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hinh_phuong_tien`
--

INSERT INTO `hinh_phuong_tien` (`ma_hinh`, `ma_phuong_tien`, `duong_dan`) VALUES
(1, 1, '1765976233954-solati-1.jpg'),
(2, 1, '1765976233956-solati-2.jpg'),
(3, 1, '1765976233958-solati-3.jpg'),
(7, 3, '1765976684473-HyundaiCounty-1.jpg'),
(8, 3, '1765976684477-HyundaiCounty-2.jpg'),
(9, 3, '1765976684477-HyundaiCounty-3.jpg'),
(10, 4, '1765976920782-bluesky-bus-1.jpg'),
(11, 4, '1765976920782-bluesky-bus-2.jpg'),
(12, 4, '1765976920782-bluesky-bus-3.jpg'),
(13, 2, '1765986202054-FordTransit-1.png'),
(14, 2, '1765986202055-FordTransit-2.png'),
(15, 2, '1765986202056-FordTransit-3.png');

-- --------------------------------------------------------

--
-- Table structure for table `khach_san`
--

DROP TABLE IF EXISTS `khach_san`;
CREATE TABLE IF NOT EXISTS `khach_san` (
  `ma_khach_san` int NOT NULL AUTO_INCREMENT,
  `ten_khach_san` varchar(100) NOT NULL,
  `ma_dia_diem` int NOT NULL,
  `dia_chi` varchar(255) NOT NULL,
  `gia_thue` int NOT NULL,
  `quan_ly` varchar(100) NOT NULL,
  `sdt` varchar(10) NOT NULL,
  `trang_thai` tinyint NOT NULL DEFAULT '0',
  `anh_bia` varchar(255) NOT NULL,
  PRIMARY KEY (`ma_khach_san`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `khach_san`
--

INSERT INTO `khach_san` (`ma_khach_san`, `ten_khach_san`, `ma_dia_diem`, `dia_chi`, `gia_thue`, `quan_ly`, `sdt`, `trang_thai`, `anh_bia`) VALUES
(1, 'Ciel Rose Hotel', 1, 'Đường Limoni 27 - 29 L3, New An Thới, Phú Quốc, Việt Nam', 900000, 'Nguyễn Văn A', '0123456789', 1, '1765986282768-CielRose-1.jpg'),
(2, 'Ruby Phú Quốc', 1, 'Tổ 1 Ấp Suối Lớn, Dương Tơ, Phú Quốc, Kiên Giang', 275000, 'Nguyễn Văn B', '0908186073', 1, '1765984672859-RubyPhuQuoc-1.png');

-- --------------------------------------------------------

--
-- Table structure for table `phuong_tien`
--

DROP TABLE IF EXISTS `phuong_tien`;
CREATE TABLE IF NOT EXISTS `phuong_tien` (
  `ma_phuong_tien` int NOT NULL AUTO_INCREMENT,
  `ten_phuong_tien` varchar(100) NOT NULL,
  `bien_so` varchar(20) NOT NULL,
  `so_cho` int NOT NULL,
  `trang_thai` tinyint NOT NULL DEFAULT '0',
  `hinh_dai_dien` varchar(255) NOT NULL,
  PRIMARY KEY (`ma_phuong_tien`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `phuong_tien`
--

INSERT INTO `phuong_tien` (`ma_phuong_tien`, `ten_phuong_tien`, `bien_so`, `so_cho`, `trang_thai`, `hinh_dai_dien`) VALUES
(1, 'Hyundai Solati', '59B-123.45', 16, 0, '1765976233953-solati-1.jpg'),
(2, 'Ford Transit', '50B-888.88', 16, 0, '1765976458846-FordTransit-1.png'),
(3, 'Hyundai County', '59B-987.65', 30, 0, '1765976684466-HyundaiCounty-1.jpg'),
(4, 'Thaco Bluesky', '59B-678.90', 47, 0, '1765976920781-bluesky-bus-1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tour`
--

DROP TABLE IF EXISTS `tour`;
CREATE TABLE IF NOT EXISTS `tour` (
  `matour` int NOT NULL AUTO_INCREMENT,
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
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tour`
--

INSERT INTO `tour` (`matour`, `tentour`, `diemdi`, `diemden`, `loaitour`, `hinhdaidien`, `motangan`, `motachitiet`, `ngaydi`, `ngayve`, `thoiluong`, `giavenguoilon`, `giavetreem`, `soluong`) VALUES
(1, 'Đà Lạt', 'tphcm', 'dalat', 'dulich', '1764392577383-da-lat.jpg', 'Đà Lạt chill chill', 'Đà Lạt chill chill', '2025-11-29', '2025-12-07', '8 ngày', 1000000, 900000, 15),
(2, 'Tour Bến Tre', 'tphcm', 'bentre', 'nghiduong', '1764392953027-ben-tre.jpg', 'Về Bến Tre miền Tây', 'Bến Tre - miền Tây sông nước', '2025-12-04', '2025-12-08', '4 ngày', 500000, 350000, 26),
(3, 'Tour Vũng Tàu', 'bentre', 'vungtau', 'nghiduong', '1764393035415-vung-tau.jpg', 'Đi tắm biển ở Vũng Tàu', 'Đi tắm biển ở Vũng Tàu, ăn hải sản tươi ngon', '2025-12-06', '2025-12-07', '1 ngày', 250000, 120000, 15),
(4, 'Tour Phan Thiết', 'tphcm', 'phanthiet', 'dulich', '1765883902180-phan-thiet.jpg', 'Tour Phan Thiết', 'Tour Phan Thiết', '2025-12-17', '2025-12-21', '4 ngày', 500000, 700000, 45);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `hoten` varchar(50) NOT NULL,
  `vaitro` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `email`, `password`, `hoten`, `vaitro`) VALUES
(7, 'phuong@gmail.com', '$2b$10$ZcOdydTFO8tlhIAVqLHWQuxr5CXIbd/0ECAeRHHqfmRxlU0duAgsm', 'Phương', 1),
(8, 'oke@gmail.com', '$2b$10$3kG9sWqPmdfpgwCnHy7MEuDU4nSUJK0C2KDNS41j7NRmLMxc65KBy', 'oke', 0),
(9, 'aa@gmail.com', '$2b$10$.LBLh/gUih0OG75sZC5oYeoPOz19Hju.85XEFnXVcFIXkOjnL1caC', 'aa', 0),
(10, 'dinhphuong@gmail.com', '$2b$10$caTp4TPxS5sHNzE2rG7THOIuI7LNq0VW3P.nH0SjUJPumQY0thsra', 'Nguyễn Đình Phương', 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `hinh_dia_diem`
--
ALTER TABLE `hinh_dia_diem`
  ADD CONSTRAINT `hinh_dia_diem_ibfk_1` FOREIGN KEY (`ma_dia_diem`) REFERENCES `dia_diem` (`ma_dia_diem`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hinh_khach_san`
--
ALTER TABLE `hinh_khach_san`
  ADD CONSTRAINT `hinh_khach_san_ibfk_1` FOREIGN KEY (`ma_khach_san`) REFERENCES `khach_san` (`ma_khach_san`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hinh_phuong_tien`
--
ALTER TABLE `hinh_phuong_tien`
  ADD CONSTRAINT `hinh_phuong_tien_ibfk_1` FOREIGN KEY (`ma_phuong_tien`) REFERENCES `phuong_tien` (`ma_phuong_tien`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
