-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 13, 2021 at 02:27 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `event_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `event_name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `start_date` varchar(255) DEFAULT NULL,
  `end_date` varchar(255) DEFAULT NULL,
  `banner` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `event_name`, `location`, `start_date`, `end_date`, `banner`) VALUES
(1, 'vava', 'vad', '12/13/2021', '12/13/2021', 'image-1639401957620.jpg'),
(2, 'vava', 'vad', '12/13/2021', '12/13/2021', 'image-1639401980788.jpg'),
(3, 'vaa', '`aava', '12/13/2021', '12/13/2021', 'image-1639401989616.jpg'),
(4, 'ava', 'svdsa', '12/13/2021', '12/13/2021', 'image-1639402004443.jpg'),
(5, 'ava', 'svdsa', '12/13/2021', '12/13/2021', 'image-1639402010875.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
