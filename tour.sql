-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 26, 2025 at 04:13 PM
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `dia_diem`
--

INSERT INTO `dia_diem` (`ma_dia_diem`, `ten_dia_diem`, `mota`, `hinhdaidien`, `trang_thai`) VALUES
(1, 'Phú Quốc', 'Phú Quốc – Thiên đường \'Đảo Ngọc\' nơi màu xanh của biển trời hòa quyện làm một!\r\n\r\nHãy để đôi chân trần chạm vào những bờ cát trắng mịn như kem tại Bãi Sao, Bãi Kem và ngâm mình trong làn nước ngọc bích trong veo. Đừng bỏ lỡ trải nghiệm lướt cáp treo vượt biển dài nhất thế giới, hay khoảnh khắc săn hoàng hôn tím biếc \"cực phẩm\" tại Sunset Town lãng mạn.\r\n\r\nSau một ngày thỏa sức lặn ngắm san hô, hãy sưởi ấm dạ dày bằng tô bún quậy kiến thiết cay nồng hay bữa tiệc hải sản tươi rói ngay bên bờ sóng. Phú Quốc chính là định nghĩa hoàn hảo cho một kỳ nghỉ dưỡng đẳng cấp!', '1765969450466-phu-quoc.jpg', 1),
(2, 'Bến Tre', 'Bến Tre – Về với xứ Dừa, về với bình yên sông nước miệt vườn!\r\n\r\nHãy một lần thả mình trên chiếc xuồng ba lá, len lỏi qua những con rạch rợp bóng dừa nước xanh mát rượi. Bạn sẽ được ghé thăm những cù lao trù phú như Cồn Phụng, tận mắt xem quy trình làm kẹo dừa thủ công nóng hổi và thưởng thức trái cây ngọt lành ngay tại vườn.\r\n\r\nTrong không gian thoáng đãng, đừng quên lắng nghe điệu Đờn ca tài tử ngọt ngào và thử món cơm dừa tép rang béo ngậy độc đáo. Bến Tre hứa hẹn mang đến cho bạn một trải nghiệm miền Tây mộc mạc và chân tình nhất!', '1765969645265-ben-tre.jpg', 1),
(3, 'Cà Mau', 'Hãy một lần về Cà Mau – mảnh đất thiêng liêng nơi \'đất biết nở, rừng biết đi\' tại cực Nam Tổ quốc!\r\n\r\nĐến đây, bạn không chỉ được chạm tay vào cột mốc toạ độ quốc gia đầy tự hào, mà còn đắm mình trong màu xanh bạt ngàn của những cánh rừng đước, rừng tràm nguyên sinh hùng vĩ. Hãy thử cảm giác ngồi vỏ lãi lướt sóng, len lỏi qua những kênh rạch chằng chịt và hít thở bầu không khí trong lành của U Minh Hạ.\r\n\r\nĐừng quên thưởng thức cua Cà Mau trứ danh – món quà hào phóng của biển cả, cùng sự chân chất, hào sảng đậm tình người miền Tây. Cà Mau chắc chắn sẽ là một hành trình để thương, để nhớ!', '1766763656998-camau-1.jpg', 1),
(4, 'Đà Lạt', 'Đà Lạt – \'Tiểu Paris\' mộng mơ giữa cao nguyên, nơi mùa xuân dường như chẳng bao giờ kết thúc!\r\n\r\nHãy đến đây để trốn cái nóng oi ả, cuộn mình trong cái lạnh se sắt ngọt ngào và thả hồn theo tiếng thông reo vi vu. Bạn sẽ được đắm chìm trong sắc hoa cẩm tú cầu rực rỡ, dạo bước quanh Hồ Xuân Hương tĩnh lặng hay thử thách dậy sớm săn mây bồng bềnh nơi Cầu Đất.\r\n\r\nĐêm về, không gì tuyệt hơn việc ngồi bên bếp than hồng, thưởng thức bánh tráng nướng giòn tan và ly sữa đậu nành nóng hổi. Đà Lạt – trạm dừng chân bình yên để chữa lành mọi tâm hồn!', '1766763705681-dalat-1.png', 1),
(5, 'Vũng Tàu', 'Vũng Tàu – Điểm hẹn biển xanh vẫy gọi ngay cửa ngõ Sài Gòn!\r\n\r\nChỉ cần một chuyến đi ngắn, bạn đã có thể rũ bỏ mọi khói bụi đô thị để hòa mình vào tiếng sóng vỗ rì rào và gió biển mát lành. Hãy thử cảm giác chinh phục Tượng Chúa dang tay, ngắm toàn cảnh thành phố từ ngọn Hải Đăng cổ kính, hay \'sống ảo\' cực chất tại Mũi Nghinh Phong lộng gió.\r\n\r\nVà tất nhiên, đừng quên nuông chiều vị giác với đĩa bánh khọt giòn rụm hay nồi lẩu cá đuối chua cay đậm đà. Vũng Tàu luôn là chốn dừng chân lý tưởng để nạp đầy năng lượng!', '1766763744065-vungtau-1.jpg', 1),
(6, 'Thành phố Hồ Chí Minh', 'TP. Hồ Chí Minh – Thành phố không ngủ, nơi nhịp sống hiện đại hối hả hòa quyện cùng những hoài niệm cổ kính!\r\n\r\nĐến đây, bạn sẽ lạc vào sự giao thoa đầy thú vị: vừa check-in những công trình trăm tuổi như Bưu điện Thành phố, Dinh Độc Lập, vừa choáng ngợp trước Landmark 81 chọc trời. Hãy thử trải nghiệm văn hóa \'cà phê bệt\' độc đáo, dạo bước trên phố đi bộ Nguyễn Huệ hay hòa mình vào không khí cuồng nhiệt thâu đêm tại Bùi Viện.\r\n\r\nĐừng quên nuông chiều bản thân với thiên đường ẩm thực đường phố, từ ổ bánh mì giòn rụm đến dĩa cơm tấm sườn bì trứ danh. Sài Gòn hào sảng, phóng khoáng chắc chắn sẽ khiến bạn yêu ngay từ lần đầu gặp gỡ!', '1766763995982-hcm-1.jpg', 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `don_dat`
--

INSERT INTO `don_dat` (`id_don_dat`, `userid`, `ma_lich_trinh`, `tong_so_nguoi_di`, `tong_tien`, `ngay_dat`) VALUES
(1, 11, 2, 2, 5500000, '2025-12-19'),
(2, 7, 2, 1, 3000000, '2025-12-19'),
(3, 13, 2, 1, 3000000, '2025-12-21');

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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hinh_dia_diem`
--

INSERT INTO `hinh_dia_diem` (`ma_hinh`, `ma_dia_diem`, `duong_dan`) VALUES
(11, 1, '1766763454000-phuquoc-1.jpeg'),
(12, 1, '1766763454001-phuquoc-2.jpg'),
(13, 1, '1766763454030-phuquoc-3.jpg'),
(14, 1, '1766763454031-phuquoc-4.jpg'),
(15, 2, '1766763586415-bentre-1.png'),
(16, 2, '1766763586419-bentre-2.jpg'),
(17, 2, '1766763586420-bentre-3.jpg'),
(18, 2, '1766763586424-bentre-4.jpg'),
(19, 3, '1766763656999-camau-1.jpg'),
(20, 3, '1766763657000-camau-2.jpg'),
(21, 3, '1766763657001-camau-3.jpg'),
(22, 3, '1766763657002-camau-4.jpg'),
(23, 4, '1766763705682-dalat-1.png'),
(24, 4, '1766763705683-dalat-2.jpg'),
(25, 4, '1766763705683-dalat-3.jpg'),
(26, 4, '1766763705684-dalat-4.jpg'),
(27, 5, '1766763744065-vungtau-1.jpg'),
(28, 5, '1766763744066-vungtau-2.jpg'),
(29, 5, '1766763744067-vungtau-3.jpg'),
(30, 5, '1766763744068-vungtau-4.jpg'),
(31, 6, '1766763995984-hcm-1.jpg'),
(32, 6, '1766763995987-hcm-2.jpg'),
(33, 6, '1766763995988-hcm-3.jpg'),
(34, 6, '1766763995989-hcm-3.png'),
(35, 6, '1766763996000-hcm-4.jpg');

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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hinh_khach_san`
--

INSERT INTO `hinh_khach_san` (`ma_hinh_anh`, `ma_khach_san`, `duong_dan`) VALUES
(4, 2, '1765984672863-RubyPhuQuoc-1.png'),
(5, 2, '1765984672892-RubyPhuQuoc-2.png'),
(6, 2, '1765984672895-RubyPhuQuoc-3.png'),
(7, 1, '1765986293153-CielRose-1.jpg'),
(8, 1, '1765986293153-CielRose-2.jpg'),
(9, 1, '1765986293154-CielRose-3.jpg'),
(10, 3, '1766764376330-0222g12000nxa3iyl8EF6_W_1280_853_R5.webp'),
(11, 3, '1766764376331-0224z12000nxa3jzh7368_W_1280_853_R5.webp'),
(12, 3, '1766764376332-22030u000000jdi5k52AA_W_1280_853_R5.webp'),
(13, 3, '1766764376332-0222112000j6yj1798734_W_1280_853_R5.webp'),
(14, 4, '1766764562931-200i090000003sdhj9533_W_1280_853_R5.webp'),
(15, 4, '1766764562932-200n11000000qy6aqF4A8_W_1280_853_R5.webp'),
(16, 4, '1766764562932-220u0r000000hc3yd34F0_W_1280_853_R5.webp'),
(17, 4, '1766764562932-22070s000000hz8ubB139_W_1280_853_R5.webp'),
(18, 5, '1766764716828-0222r120009zsxnrwB8DF_W_1280_853_R5.webp'),
(19, 5, '1766764716828-0225g12000i57bd8s6A9B_W_1280_853_R5.webp'),
(20, 5, '1766764716829-0224812000fj2skzu90E5_W_1280_853_R5.webp'),
(21, 5, '1766764716830-0582212000kmrq8fb0019_Z_320_220_R5_D.webp'),
(22, 6, '1766764801412-1ik0j12000nr3n6iu38F7_W_1280_853_R5.webp'),
(23, 6, '1766764801413-1z67212000jvd00ju5FF2_W_1280_853_R5.webp'),
(24, 6, '1766764801413-0222t12000l7pl0jn4362_W_1280_853_R5.webp'),
(25, 6, '1766764801414-0225c12000njc9r6nA3B0_W_1280_853_R5.webp'),
(26, 7, '1766764901512-1z60612000l3hsuqnBCD8_W_1280_853_R5.webp'),
(27, 7, '1766764901512-02X6412000j2g5clc7413_W_1280_853_R5.webp'),
(28, 7, '1766764901512-0224j12000lm9moofB0C6_W_1280_853_R5.webp'),
(29, 7, '1766764901512-0226u12000lm9mvt275CD_Z_320_220_R5_D.webp'),
(30, 8, '1766764997395-1mc2r12000p7mlk43CE86_W_1280_853_R5.webp'),
(31, 8, '1766764997395-1mc5j12000ov1sm335480_W_1280_853_R5.webp'),
(32, 8, '1766764997395-1z67012000ou0keyxB9C6_W_1280_853_R5.webp'),
(33, 8, '1766764997395-0223z12000qbruqzhC234_W_1280_853_R5.webp'),
(34, 9, '1766765126145-1mc1y12000pd5397q5582_W_1280_853_R5.webp'),
(35, 9, '1766765126146-1z64412000pcny74z3975_W_1280_853_R5.webp'),
(36, 9, '1766765126146-0222s12000ci5p6o8C35D_W_1280_853_R5.webp'),
(37, 9, '1766765126146-0222812000k3m0gkb7508_W_1280_853_R5.webp'),
(38, 10, '1766765413044-1mc6b12000jgxqgm41A9F_W_1280_853_R5.webp'),
(39, 10, '1766765413044-1z64l12000jgvtrokE5CC_W_1280_853_R5.webp'),
(40, 10, '1766765413045-1z66312000jgvsejj0CCC_W_1280_853_R5.webp'),
(41, 10, '1766765413045-02X1912000jimijfsE201_W_1280_853_R5.webp');

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
  PRIMARY KEY (`ma_khach_san`),
  KEY `ma_dia_diem` (`ma_dia_diem`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `khach_san`
--

INSERT INTO `khach_san` (`ma_khach_san`, `ten_khach_san`, `ma_dia_diem`, `dia_chi`, `gia_thue`, `quan_ly`, `sdt`, `trang_thai`, `anh_bia`) VALUES
(1, 'Ciel Rose Hotel', 1, 'Đường Limoni 27 - 29 L3, New An Thới, Phú Quốc, Việt Nam', 900000, 'Nguyễn Văn A', '0123456789', 1, '1765986282768-CielRose-1.jpg'),
(2, 'Ruby Phú Quốc', 1, 'Tổ 1 Ấp Suối Lớn, Dương Tơ, Phú Quốc, Kiên Giang', 275000, 'Nguyễn Văn B', '0908186073', 1, '1765984672859-RubyPhuQuoc-1.png'),
(3, 'Central Ngọc Hotel', 6, '216 Đề Thám, Phường Phạm Ngũ Lão, Quận 1, Thành phố Hồ Chí Minh', 463000, 'Nguyễn Thị Ngọc', '0987654321', 1, '1766764376330-0224z12000nxa3jzh7368_W_1280_853_R5.webp'),
(4, 'Little Brick Saigon Hotel', 6, '18 Bui Thi Xuan Str., Quận 1, TP. Hồ Chí Minh', 280000, 'Nguyễn Anh Gạch', '0251736128', 1, '1766764562930-200i090000003sdhj9533_W_1280_853_R5.webp'),
(5, 'Khách sạn Huỳnh Thảo', 2, '69C Đồng Văn Cống, Bình Phú, Bến Tre, Vĩnh Long', 705000, 'Huỳnh Thảo', '0263625163', 1, '1766764716828-0582212000kmrq8fb0019_Z_320_220_R5_D.webp'),
(6, 'Bamboo Riverside Boutique Hotel', 2, '567, Tân An Thượng, Huyện Châu Thành, Tỉnh Bến Tre, Việt Nam, Châu Thành, Vĩnh Long', 1000000, 'Adam Nguyễn', '0361423761', 1, '1766764801412-0225c12000njc9r6nA3B0_W_1280_853_R5.webp'),
(7, 'Nghĩa Lan Hotel', 4, '97/5 Phan Bội Châu, Phường 1, Đà Lạt, Lâm Đồng 670000, Vietnam, Phường 1, Đà Lạt, Lâm Đồng', 508000, 'Nghĩa Lan', '0251463127', 1, '1766764901511-1z60612000l3hsuqnBCD8_W_1280_853_R5.webp'),
(8, 'Almira Home Da Lat', 4, 'Hẻm 39 Ngô Quyền, Phường 6, Đà Lạt, Lâm Đồng 67000, Việt Nam, Phường 6, Đà Lạt, Lâm Đồng', 911111, 'Almira', '0438765981', 1, '1766764997394-1z67012000ou0keyxB9C6_W_1280_853_R5.webp'),
(9, 'Ruby Hotel', 3, '54GX+CV5, 19-20A Đ. Hùng Vương, Phường 7, Cà Mau, Việt Nam, Cà Mau', 391581, 'Trần Văn Nghĩa', '0153972641', 1, '1766765126145-0222812000k3m0gkb7508_W_1280_853_R5.webp'),
(10, 'YÊN LUXURY HOTEL', 5, '17F10 Trần Bình Trọng, phường Nguyễn An Ninh, Thành phố Vũng Tàu, Tỉnh Bà Rịa - Vũng Tàu, Việt Nam, Vũng Tàu', 416667, 'Trần Thị Yên', '0573295237', 1, '1766765413044-1z66312000jgvsejj0CCC_W_1280_853_R5.webp');

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `lich_trinh_tour`
--

INSERT INTO `lich_trinh_tour` (`ma_lich_trinh`, `ma_tour`, `ma_phuong_tien`, `ma_khach_san`, `ngay_di`, `ngay_ve`, `gia_nguoi_lon`, `gia_tre_em`, `so_cho_da_dat`, `trang_thai`) VALUES
(2, 1, 3, 2, '2025-12-22 22:22:00', '2025-12-25 22:22:00', 3000000, 2500000, 4, 1),
(4, 2, 4, 8, '2026-01-11 23:05:00', '2026-01-15 23:05:00', 6700000, 6200000, 0, 1),
(5, 3, 4, 10, '2026-01-18 23:10:00', '2026-01-20 23:10:00', 3200000, 3000000, 0, 1),
(6, 4, 3, 4, '2026-01-28 23:11:00', '2026-01-30 23:12:00', 4200000, 4100000, 0, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `nguoi_di_tour`
--

INSERT INTO `nguoi_di_tour` (`id_nguoi_di_tour`, `id_don_dat`, `ho_ten`, `ngay_sinh`, `nguoi_dat_tour`) VALUES
(1, 1, 'Phong', '2002-01-18', 1),
(2, 1, 'Trẻ trâu', '2020-01-14', 0),
(3, 2, 'Phương', '2004-02-21', 1),
(4, 3, 'Nguyễn Đình Phương', '2004-02-21', 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tour`
--

INSERT INTO `tour` (`ma_tour`, `ten_tour`, `diem_di`, `diem_den`, `trang_thai`) VALUES
(1, 'Tour du lịch Bến Tre - Phú Quốc', 2, 1, 1),
(2, 'Tour du lịch Thành phố Hồ Chí Minh - Đà Lạt', 6, 4, 1),
(3, 'Tour du lịch Thành phố Hồ Chí Minh - Vũng Tàu', 6, 5, 1),
(4, 'Tour du lịch Bến Tre - Hồ Chí Minh', 2, 6, 1);

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `email`, `password`, `hoten`, `ngay_sinh`, `vaitro`) VALUES
(7, 'phuong@gmail.com', '$2b$10$ZcOdydTFO8tlhIAVqLHWQuxr5CXIbd/0ECAeRHHqfmRxlU0duAgsm', 'Phương', '2004-02-22', 1),
(11, 'phong@gmail.com', '$2b$10$F9JKtF.pV.JYgeCHHI2NjuT6EzkrGwd93FPBpBn6hyBpQo6Dp0/qW', 'Phong', '2002-01-19', 0),
(12, 'vana@gmail.com', '$2b$10$n71pvAUu5B5icdl/gNtAt.EMzou0siw1NBbpQnRiES2/Ii8U4obp6', 'Nguyễn Văn A', '2005-11-22', 0),
(13, 'dinhphuong@gmail.com', '$2b$10$gSFE2AP6XaWx5bXYaZHs0.h9DirWv6AKam4xhoN4LMEaZl2F9iuTO', 'Nguyễn Đình Phương', '2004-02-22', 0);

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
-- Constraints for table `khach_san`
--
ALTER TABLE `khach_san`
  ADD CONSTRAINT `khach_san_ibfk_1` FOREIGN KEY (`ma_dia_diem`) REFERENCES `dia_diem` (`ma_dia_diem`) ON DELETE CASCADE ON UPDATE CASCADE;

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
