-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 19, 2025 at 04:35 PM
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
-- Table structure for table `don_dat`
--

DROP TABLE IF EXISTS `don_dat`;
CREATE TABLE IF NOT EXISTS `don_dat` (
  `id_don_dat` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `ma_lich_trinh` int NOT NULL,
  `tong_so_nguoi_di` int NOT NULL,
  `tong_tien` int NOT NULL,
  `ngay_dat` date NOT NULL,
  PRIMARY KEY (`id_don_dat`),
  KEY `ma_lich_trinh` (`ma_lich_trinh`),
  KEY `userid` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `don_dat`
--

INSERT INTO `don_dat` (`id_don_dat`, `userid`, `ma_lich_trinh`, `tong_so_nguoi_di`, `tong_tien`, `ngay_dat`) VALUES
(1, 11, 2, 2, 5500000, '2025-12-19'),
(2, 7, 2, 1, 3000000, '2025-12-19');

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
-- Table structure for table `lich_trinh_tour`
--

DROP TABLE IF EXISTS `lich_trinh_tour`;
CREATE TABLE IF NOT EXISTS `lich_trinh_tour` (
  `ma_lich_trinh` int NOT NULL AUTO_INCREMENT,
  `ma_tour` int NOT NULL,
  `ma_phuong_tien` int NOT NULL,
  `ma_khach_san` int NOT NULL,
  `ngay_di` datetime NOT NULL,
  `ngay_ve` datetime NOT NULL,
  `gia_nguoi_lon` decimal(15,0) NOT NULL,
  `gia_tre_em` decimal(15,0) NOT NULL,
  `so_cho_da_dat` int NOT NULL DEFAULT '0',
  `trang_thai` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`ma_lich_trinh`),
  KEY `ma_tour` (`ma_tour`),
  KEY `ma_khach_san` (`ma_khach_san`),
  KEY `ma_phuong_tien` (`ma_phuong_tien`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `lich_trinh_tour`
--

INSERT INTO `lich_trinh_tour` (`ma_lich_trinh`, `ma_tour`, `ma_phuong_tien`, `ma_khach_san`, `ngay_di`, `ngay_ve`, `gia_nguoi_lon`, `gia_tre_em`, `so_cho_da_dat`, `trang_thai`) VALUES
(2, 1, 3, 2, '2025-12-22 22:22:00', '2025-12-25 22:22:00', 3000000, 2500000, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `nguoi_di_tour`
--

DROP TABLE IF EXISTS `nguoi_di_tour`;
CREATE TABLE IF NOT EXISTS `nguoi_di_tour` (
  `id_nguoi_di_tour` int NOT NULL AUTO_INCREMENT,
  `id_don_dat` int NOT NULL,
  `ho_ten` varchar(50) NOT NULL,
  `ngay_sinh` date NOT NULL,
  `nguoi_dat_tour` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_nguoi_di_tour`),
  KEY `id_don_dat` (`id_don_dat`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `nguoi_di_tour`
--

INSERT INTO `nguoi_di_tour` (`id_nguoi_di_tour`, `id_don_dat`, `ho_ten`, `ngay_sinh`, `nguoi_dat_tour`) VALUES
(1, 1, 'Phong', '2002-01-18', 1),
(2, 1, 'Trẻ trâu', '2020-01-14', 0),
(3, 2, 'Phương', '2004-02-21', 1);

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
(1, 'Hyundai Solati', '59B-123.45', 15, 0, '1765976233953-solati-1.jpg'),
(2, 'Ford Transit', '50B-888.88', 15, 0, '1765976458846-FordTransit-1.png'),
(3, 'Hyundai County', '59B-987.65', 29, 0, '1765976684466-HyundaiCounty-1.jpg'),
(4, 'Thaco Bluesky', '59B-678.90', 45, 0, '1765976920781-bluesky-bus-1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tour`
--

DROP TABLE IF EXISTS `tour`;
CREATE TABLE IF NOT EXISTS `tour` (
  `ma_tour` int NOT NULL AUTO_INCREMENT,
  `ten_tour` varchar(100) NOT NULL,
  `diem_di` int NOT NULL,
  `diem_den` int NOT NULL,
  `trang_thai` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`ma_tour`),
  KEY `diem_di` (`diem_di`),
  KEY `diem_den` (`diem_den`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tour`
--

INSERT INTO `tour` (`ma_tour`, `ten_tour`, `diem_di`, `diem_den`, `trang_thai`) VALUES
(1, 'Tour du lịch Bến Tre - Phú Quốc', 2, 1, 1);

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
  `ngay_sinh` date NOT NULL,
  `vaitro` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `email`, `password`, `hoten`, `ngay_sinh`, `vaitro`) VALUES
(7, 'phuong@gmail.com', '$2b$10$ZcOdydTFO8tlhIAVqLHWQuxr5CXIbd/0ECAeRHHqfmRxlU0duAgsm', 'Phương', '2004-02-22', 1),
(11, 'phong@gmail.com', '$2b$10$F9JKtF.pV.JYgeCHHI2NjuT6EzkrGwd93FPBpBn6hyBpQo6Dp0/qW', 'Phong', '2002-01-19', 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `don_dat`
--
ALTER TABLE `don_dat`
  ADD CONSTRAINT `don_dat_ibfk_1` FOREIGN KEY (`ma_lich_trinh`) REFERENCES `lich_trinh_tour` (`ma_lich_trinh`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `don_dat_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE RESTRICT ON UPDATE CASCADE;

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

--
-- Constraints for table `lich_trinh_tour`
--
ALTER TABLE `lich_trinh_tour`
  ADD CONSTRAINT `lich_trinh_tour_ibfk_1` FOREIGN KEY (`ma_tour`) REFERENCES `tour` (`ma_tour`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lich_trinh_tour_ibfk_2` FOREIGN KEY (`ma_khach_san`) REFERENCES `khach_san` (`ma_khach_san`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lich_trinh_tour_ibfk_3` FOREIGN KEY (`ma_phuong_tien`) REFERENCES `phuong_tien` (`ma_phuong_tien`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `nguoi_di_tour`
--
ALTER TABLE `nguoi_di_tour`
  ADD CONSTRAINT `nguoi_di_tour_ibfk_1` FOREIGN KEY (`id_don_dat`) REFERENCES `don_dat` (`id_don_dat`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tour`
--
ALTER TABLE `tour`
  ADD CONSTRAINT `tour_ibfk_1` FOREIGN KEY (`diem_di`) REFERENCES `dia_diem` (`ma_dia_diem`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tour_ibfk_2` FOREIGN KEY (`diem_den`) REFERENCES `dia_diem` (`ma_dia_diem`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
