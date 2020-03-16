-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql12.freemysqlhosting.net
-- Generation Time: Mar 16, 2020 at 11:54 AM
-- Server version: 5.5.58-0ubuntu0.14.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql12327739`
--

-- --------------------------------------------------------

--
-- Table structure for table `Professors`
--

CREATE TABLE `Professors` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Professors`
--

INSERT INTO `Professors` (`id`, `name`) VALUES
(1, 'Niraj Bhari'),
(3, 'undefined'),
(4, 'undefined'),
(5, 'undefined'),
(6, 'undefined'),
(7, 'undefined'),
(8, 'Satkar Dhakal'),
(9, 'Ram Barma');

-- --------------------------------------------------------

--
-- Table structure for table `ra`
--

CREATE TABLE `ra` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `degree` int(11) NOT NULL DEFAULT '0',
  `major` int(11) NOT NULL DEFAULT '0',
  `skills` varchar(255) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ra`
--

INSERT INTO `ra` (`id`, `name`, `degree`, `major`, `skills`, `created_by`, `status`) VALUES
(22, 'marry', 1, 1, 'nothing special. Marry is just a normal student without any talents', 1, 'hellow test 123'),
(23, 'sdafsdf', 0, 0, 'sdafasdf', 1, ''),
(25, 'subhash rajbhandari', 1, 1, 'dsafsadf', 1, ''),
(27, 'Guy with no name', 0, 0, 'NOthing', 1, ''),
(28, 'Ram Khanal', 0, 0, 'Nothing', 1, ''),
(29, 'Manoj Shrestha', 0, 0, 'Programmer', 9, '');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `deadline` varchar(50) NOT NULL,
  `details` text,
  `assigned_to` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `completion` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `name`, `deadline`, `details`, `assigned_to`, `created_by`, `completion`) VALUES
(1, 'hello world', '2020-03-11T15:18:00.000Z', 'sdakldjaslkdjasl', 22, 1, 40),
(8, 'New Task', '2020-03-14T17:54:51.277Z', 'Harip Task', 22, 1, 20),
(9, 'lol', '2020-03-15T15:48:07.992Z', 'hello', 25, 0, 0),
(10, 'sadfasdfklj', '2020-03-15T15:52:53.570Z', 'asdjfasdkjf', 23, 1, 0),
(11, 'asdas', '2020-03-15T15:59:18.832Z', 'asdasd', NULL, 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Professors`
--
ALTER TABLE `Professors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ra`
--
ALTER TABLE `ra`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Professors`
--
ALTER TABLE `Professors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `ra`
--
ALTER TABLE `ra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
