-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.41 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- muboknote 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `muboknote` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `muboknote`;

-- 테이블 muboknote.bookmark 구조 내보내기
CREATE TABLE IF NOT EXISTS `bookmark` (
  `bookmark_no` int NOT NULL AUTO_INCREMENT,
  `member_no` int NOT NULL,
  `feed_no` int NOT NULL,
  `cdatetime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bookmark_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 muboknote.bookmark:~0 rows (대략적) 내보내기

-- 테이블 muboknote.chat_message 구조 내보내기
CREATE TABLE IF NOT EXISTS `chat_message` (
  `chat_message_no` int NOT NULL AUTO_INCREMENT,
  `room_no` int NOT NULL,
  `sender_no` int NOT NULL,
  `receiver_no` int NOT NULL,
  `message` text NOT NULL,
  `cdatetime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`chat_message_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 muboknote.chat_message:~0 rows (대략적) 내보내기

-- 테이블 muboknote.comment 구조 내보내기
CREATE TABLE IF NOT EXISTS `comment` (
  `comment_no` int NOT NULL AUTO_INCREMENT,
  `feed_no` int NOT NULL,
  `member_no` int NOT NULL,
  `content` text NOT NULL,
  `cdatetime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_no`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 muboknote.comment:~7 rows (대략적) 내보내기
INSERT INTO `comment` (`comment_no`, `feed_no`, `member_no`, `content`, `cdatetime`) VALUES
	(1, 22, 1, 'ㅅㄷㄴㅅ', '2025-05-13 12:53:32'),
	(2, 22, 1, 'test', '2025-05-13 12:53:36'),
	(3, 17, 1, '울산 가고싶다', '2025-05-13 12:54:02'),
	(4, 22, 1, '바이크 타러가고 싶다', '2025-05-13 15:31:49'),
	(5, 25, 1, '배두나!!', '2025-05-13 15:50:14'),
	(6, 17, 1, '울산 가고싶다2222', '2025-05-13 15:58:17'),
	(7, 25, 1, '배두나!', '2025-05-13 16:01:38');

-- 테이블 muboknote.course 구조 내보내기
CREATE TABLE IF NOT EXISTS `course` (
  `course_no` int NOT NULL AUTO_INCREMENT,
  `feed_no` int NOT NULL,
  `order_no` int NOT NULL,
  `place_name` varchar(100) NOT NULL,
  `latitude` decimal(10,7) NOT NULL,
  `longitude` decimal(10,7) NOT NULL,
  PRIMARY KEY (`course_no`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 muboknote.course:~53 rows (대략적) 내보내기
INSERT INTO `course` (`course_no`, `feed_no`, `order_no`, `place_name`, `latitude`, `longitude`) VALUES
	(1, 1, 1, '서울 종로구 사직동 산 1-1', 37.5785064, 126.9635922),
	(2, 1, 2, '서울 종로구 종로6가 94-1', 37.5713037, 127.0094180),
	(3, 3, 0, '서울 서대문구 남가좌동 293-20', 37.5699761, 126.9150582),
	(4, 4, 0, '서울 서대문구 남가좌동 293-20', 37.5699761, 126.9150582),
	(5, 5, 0, '서울 종로구 와룡동 2-70', 37.5826926, 126.9971017),
	(6, 5, 1, '서울 중구 필동2가 5-3', 37.5616452, 126.9936618),
	(7, 6, 0, '서울 종로구 창신동 23-25', 37.5764930, 127.0135846),
	(8, 6, 1, '서울 종로구 창신동 23-25', 37.5765356, 127.0135348),
	(9, 7, 0, '부평역 1호선', 37.4894490, 126.7243311),
	(10, 7, 1, '부평역 1호선', 37.4894490, 126.7243311),
	(11, 8, 0, '부평역 1호선', 37.4894490, 126.7243311),
	(12, 8, 1, '경기 남양주시 평내동 562', 37.6403426, 127.2327675),
	(13, 8, 2, '평내마을주공아파트', 37.6405440, 127.2329857),
	(14, 9, 0, '연세대학교 신촌캠퍼스', 37.5643371, 126.9389357),
	(15, 10, 0, '경원대로944-10', 37.4667331, 126.6908652),
	(16, 10, 1, '청량리역', 37.5799701, 127.0477363),
	(17, 11, 0, '아침고요수목원', 37.7430040, 127.3516612),
	(18, 12, 0, '아침고요수목원', 37.7430040, 127.3516612),
	(19, 13, 0, '아침고요수목원', 37.7430040, 127.3516612),
	(20, 14, 0, '아침고요수목원', 37.7430040, 127.3516612),
	(21, 15, 0, '서울 종로구 연건동 28-21', 37.5793770, 126.9983698),
	(22, 15, 1, '서울대학교병원', 37.5795392, 126.9989924),
	(23, 16, 0, '영등포역', 37.5156828, 126.9078783),
	(24, 16, 1, '북악팔각정', 37.6015903, 126.9806581),
	(25, 16, 2, '효창공원', 37.5450822, 126.9610375),
	(26, 16, 3, '독립문역 3호선', 37.5744663, 126.9579137),
	(27, 16, 4, '영등포역', 37.5156828, 126.9078783),
	(28, 17, 0, '갤럭시호텔', 35.3816438, 129.3443681),
	(29, 17, 1, '에이오피', 35.3581056, 129.3442866),
	(30, 17, 2, '칠암일번지횟집', 35.3002170, 129.2592663),
	(31, 18, 0, '영등포역', 37.5156828, 126.9078783),
	(32, 18, 1, '남춘천역', 37.8640541, 127.7238189),
	(33, 26, 0, '영등포역', 37.5156828, 126.9078783),
	(34, 26, 1, '동대구역', 35.8793240, 128.6283938),
	(35, 26, 2, '안동역', 36.5744618, 128.6748768),
	(36, 28, 0, '청주역', 36.6471522, 127.3923352),
	(37, 28, 1, '청남대', 36.4628461, 127.4917654),
	(38, 28, 2, '청주국제공항', 36.7220270, 127.4958562),
	(39, 29, 0, '청주역', 36.6471522, 127.3923352),
	(40, 29, 1, '청남대', 36.4628461, 127.4917654),
	(41, 29, 2, '청주국제공항', 36.7220270, 127.4958562),
	(42, 30, 0, '영등포역', 37.5156828, 126.9078783),
	(43, 30, 1, '청주역', 36.6471522, 127.3923352),
	(44, 30, 2, '청남대', 36.4628461, 127.4917654),
	(45, 30, 3, '청주국제공항', 36.7220270, 127.4958562),
	(46, 30, 4, '간석역 1호선', 37.4647063, 126.6935190),
	(83, 44, 0, '영등포역', 37.5156828, 126.9078783),
	(84, 44, 1, '청남대', 36.4628461, 127.4917654),
	(85, 44, 2, '청주역', 36.6471522, 127.3923352),
	(86, 41, 0, '동묘앞역 1호선 3번출구', 37.5733300, 127.0173310),
	(87, 41, 1, '충정로역 2호선 6번출구', 37.5590539, 126.9633640);

-- 테이블 muboknote.feed 구조 내보내기
CREATE TABLE IF NOT EXISTS `feed` (
  `feed_no` int NOT NULL AUTO_INCREMENT,
  `member_no` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `region` varchar(50) DEFAULT NULL,
  `season` varchar(20) DEFAULT NULL,
  `bari_type` varchar(20) DEFAULT NULL,
  `place_type` varchar(20) DEFAULT NULL,
  `bike_cc` varchar(20) DEFAULT NULL,
  `cdatetime` datetime DEFAULT (now()),
  `udatetime` datetime DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`feed_no`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 muboknote.feed:~29 rows (대략적) 내보내기
INSERT INTO `feed` (`feed_no`, `member_no`, `title`, `content`, `region`, `season`, `bari_type`, `place_type`, `bike_cc`, `cdatetime`, `udatetime`) VALUES
	(1, 1, '', '', 'seoul', 'spring', 'night', 'mountain', '125', '2025-05-09 16:47:42', '2025-05-09 16:47:42'),
	(2, 1, 'test', 'test', '', '', '', '', '', '2025-05-09 16:53:36', '2025-05-09 16:53:36'),
	(3, 1, 'test', 'test', 'busan', 'summer', 'oneday', 'coastal', 'quarter', '2025-05-09 17:20:06', '2025-05-09 17:20:06'),
	(4, 1, 'test', 'test', 'busan', 'summer', 'oneday', 'coastal', 'quarter', '2025-05-09 17:21:12', '2025-05-09 17:21:12'),
	(5, 1, 'test', 'test', 'daegu', 'fall', 'twoday', 'urban', 'middle', '2025-05-09 17:47:53', '2025-05-09 17:47:53'),
	(6, 1, 'test', 'test', 'incheon', 'winter', 'etc', 'straight', 'liter', '2025-05-09 17:52:38', '2025-05-09 17:52:38'),
	(7, 1, 'test', 'test', 'incheon', 'winter', 'etc', 'straight', 'liter', '2025-05-09 17:54:06', '2025-05-09 17:54:06'),
	(8, 1, 'test', 'test', 'incheon', 'winter', 'etc', 'straight', 'liter', '2025-05-09 17:55:13', '2025-05-09 17:55:13'),
	(9, 1, 'test', 'test', 'busan', 'summer', 'oneday', 'mountain', 'liter', '2025-05-09 17:56:06', '2025-05-09 17:56:06'),
	(10, 1, 'test', 'test', 'busan', 'summer', 'oneday', 'mountain', 'liter', '2025-05-09 17:57:45', '2025-05-09 17:57:45'),
	(11, 1, 'test', 'test', 'gangwon', 'summer', 'twoday', 'straight', 'middle', '2025-05-09 18:06:01', '2025-05-09 18:06:01'),
	(12, 1, 'test', 'test', 'gangwon', 'summer', 'twoday', 'straight', 'middle', '2025-05-09 18:08:35', '2025-05-09 18:08:35'),
	(13, 1, 'test', 'test', 'gangwon', 'summer', 'twoday', 'straight', 'middle', '2025-05-09 18:11:43', '2025-05-09 18:11:43'),
	(14, 1, 'test', 'test', 'gangwon', 'summer', 'twoday', 'straight', 'middle', '2025-05-09 18:13:30', '2025-05-09 18:13:30'),
	(15, 1, 'test', 'test', 'seoul', 'summer', 'oneday', 'urban', 'quarter', '2025-05-09 18:14:02', '2025-05-09 18:14:02'),
	(16, 1, '코스테스트', '코스테스트', 'gyeonggi', 'spring', 'night', 'urban', 'middle', '2025-05-13 10:06:41', '2025-05-13 10:06:41'),
	(17, 1, '울산코스', '울산코스울산코스울산코스울산코스울산코스울산코스울산코스울산코스울산코스울산코스울산코스울산코스울산코스울산코스울산코스울산코스울산코스울산코스울산코스울산코스울산코스울산코스울산코스울산코스울산코스울산코스', 'ulsan', 'summer', 'twoday', 'coastal', 'liter', '2025-05-13 10:12:46', '2025-05-13 10:12:46'),
	(18, 1, '이미지 삽입 테스트', '이미지 삽입 테스트', 'gangwon', 'summer', 'etc', 'curve', 'liter', '2025-05-13 11:16:33', '2025-05-13 11:16:33'),
	(19, 1, 'insertId', '', '', '', '', '', '', '2025-05-13 11:30:44', '2025-05-13 11:30:44'),
	(20, 1, 'insertId2', '', '', '', '', '', '', '2025-05-13 11:32:12', '2025-05-13 11:32:12'),
	(21, 1, '이미지 삽입 테스트3', '', '', '', '', '', '', '2025-05-13 11:37:24', '2025-05-13 11:37:24'),
	(22, 1, '이미지 삽입 테스트4', '', '', '', '', '', '', '2025-05-13 11:39:31', '2025-05-13 11:39:31'),
	(23, 1, '썸네일테스트', '', '', '', '', '', '', '2025-05-13 12:58:53', '2025-05-13 12:58:53'),
	(24, 1, '이미지 테스트', '', '', '', '', '', '', '2025-05-13 13:04:04', '2025-05-13 13:04:04'),
	(25, 1, '이미지 출력1', '', '', '', '', '', '', '2025-05-13 14:36:59', '2025-05-13 14:36:59'),
	(26, 1, '서울-대구-안동코스', '', 'daegu', 'summer', 'oneday', 'urban', 'middle', '2025-05-13 17:37:37', '2025-05-13 17:37:37'),
	(44, 4, '청주 1박 2일코스', '청남대 가자~~~~~~~~~~~~~~~~', 'chungbuk', 'summer', 'twoday', 'mountain', 'liter', '2025-05-14 12:47:34', '2025-05-14 15:17:00');

-- 테이블 muboknote.feed_img 구조 내보내기
CREATE TABLE IF NOT EXISTS `feed_img` (
  `feed_img_no` int NOT NULL AUTO_INCREMENT,
  `feed_no` int NOT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `is_thumbnail` char(1) DEFAULT 'N',
  `cdatetime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`feed_img_no`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 muboknote.feed_img:~15 rows (대략적) 내보내기
INSERT INTO `feed_img` (`feed_img_no`, `feed_no`, `file_name`, `file_path`, `is_thumbnail`, `cdatetime`) VALUES
	(1, 21, '1747103844374_course1.PNG', 'uploads/1747103844374_course1.PNG', 'Y', '2025-05-13 11:37:24'),
	(2, 22, '1747103971819_sample1.jpg', 'uploads/1747103971819_sample1.jpg', 'Y', '2025-05-13 11:39:31'),
	(3, 23, '1747108733505_cat2.jpg', 'uploads/1747108733505_cat2.jpg', 'Y', '2025-05-13 12:58:53'),
	(4, 23, '1747108733507_cat1.jpg', 'uploads/1747108733507_cat1.jpg', 'N', '2025-05-13 12:58:53'),
	(5, 24, '1747109044474_alarm-ing.png', 'uploads/1747109044474_alarm-ing.png', 'Y', '2025-05-13 13:04:04'),
	(6, 24, '1747109044476_alarm-none.png', 'uploads/1747109044476_alarm-none.png', 'N', '2025-05-13 13:04:04'),
	(7, 25, '1747114620218_ë°°ëë.jpg', 'uploads/1747114620218_ë°°ëë.jpg', 'Y', '2025-05-13 14:37:00'),
	(8, 25, '1747114620220_kimchunsam.jpg', 'uploads/1747114620220_kimchunsam.jpg', 'N', '2025-05-13 14:37:00'),
	(9, 26, '1747125457336_sample2.jpg', 'uploads/1747125457336_sample2.jpg', 'Y', '2025-05-13 17:37:37'),
	(19, 44, '1747194454549_sample3.jpg', 'uploads/1747194454549_sample3.jpg', 'Y', '2025-05-14 12:47:34'),
	(20, 44, '1747194454551_sample4.jpg', 'uploads/1747194454551_sample4.jpg', 'N', '2025-05-14 12:47:34');

-- 테이블 muboknote.follow 구조 내보내기
CREATE TABLE IF NOT EXISTS `follow` (
  `follow_no` int NOT NULL AUTO_INCREMENT,
  `follower_no` int NOT NULL,
  `following_no` int NOT NULL,
  `cdatetime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`follow_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 muboknote.follow:~0 rows (대략적) 내보내기

-- 테이블 muboknote.member 구조 내보내기
CREATE TABLE IF NOT EXISTS `member` (
  `member_no` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `profile_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'default.png',
  `cdatetime` datetime DEFAULT CURRENT_TIMESTAMP,
  `udatetime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`member_no`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 muboknote.member:~7 rows (대략적) 내보내기
INSERT INTO `member` (`member_no`, `email`, `pwd`, `nickname`, `profile_img`, `cdatetime`, `udatetime`) VALUES
	(1, 'test@example.com', '1234', 'mubok0', 'test.jpg', '2025-05-08 14:47:12', '2025-05-12 16:17:29'),
	(2, 'test@mubok.com', '$2b$10$ZEscT7c4MH1aIx1SpBMBiexKnnFR2aUnCfJMGxV0zcY0raMKLQP9e', 'mubok', NULL, '2025-05-08 16:41:35', '2025-05-08 16:41:35'),
	(3, 'test1@mubok.com', '$2b$10$Mw11ba85rU3zZV3/LbALku0u/giFwX8yZrf53JnfcxAe1s25ghOKu', 'mubok1', 'default.png', '2025-05-08 16:45:10', '2025-05-08 16:45:10'),
	(4, 'test2@mubok.com', '$2b$10$paFpAhfxsC8.4ovbvACnhucGeAFF.hjpwbO86p4FwN2LNZq02iA3m', 'mubok2', 'default.png', '2025-05-08 16:46:22', '2025-05-08 16:46:22'),
	(6, 'test3@mubok.com', '$2b$10$Do8U3TDYSnqBJn839YxszuteMOs/z7SBXgksJ26q..E1p3n5VRTnC', 'mubok3', 'default.png', '2025-05-08 17:38:44', '2025-05-08 17:38:44'),
	(7, 'test4@mubok.com', '$2b$10$I8JWhIwjyuSpkzNvP1w6yuFsnfWc5tXRv00Tpins5YM8NrZXZYFFC', 'mubok4', 'default.png', '2025-05-08 18:11:21', '2025-05-08 18:11:21'),
	(8, 'test5@mubok.com', '$2b$10$u7Ys4qR6Ei.YiTlJ..2m8uyxMvSHn577PAHnvZV2z34sn7YJlpN.G', 'mubok5', 'default.png', '2025-05-08 18:13:50', '2025-05-08 18:13:50');

-- 테이블 muboknote.notification 구조 내보내기
CREATE TABLE IF NOT EXISTS `notification` (
  `notification_no` int NOT NULL AUTO_INCREMENT,
  `receiver_no` int NOT NULL,
  `type` varchar(50) NOT NULL,
  `target_id` int NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `is_read` char(1) DEFAULT 'N',
  `cdatetime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`notification_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 muboknote.notification:~0 rows (대략적) 내보내기

-- 테이블 muboknote.room 구조 내보내기
CREATE TABLE IF NOT EXISTS `room` (
  `room_no` int NOT NULL AUTO_INCREMENT,
  `member1_no` int NOT NULL,
  `member2_no` int NOT NULL,
  `cdatetime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`room_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 muboknote.room:~0 rows (대략적) 내보내기

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
