-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 03 Bulan Mei 2020 pada 06.38
-- Versi server: 10.4.6-MariaDB
-- Versi PHP: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gearbox`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `data_msisdn`
--

CREATE TABLE `data_msisdn` (
  `id` int(255) NOT NULL,
  `msisdn` varchar(128) NOT NULL,
  `idtoken` text NOT NULL,
  `user_email` varchar(128) NOT NULL DEFAULT 'default@webmanajemen.com',
  `auth_id` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `data_msisdn`
--

INSERT INTO `data_msisdn` (`id`, `msisdn`, `idtoken`, `user_email`, `auth_id`) VALUES
(1680, '6281357167342', 'eyJ0eXAiOiJKV1QiLCJ6aXAiOiJOT05FIiwia2lkIjoid1UzaWZJSWFMT1VBUmVSQi9GRzZlTTFQMVFNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxMzdlYjhhMS04MGNiLTRmNTAtYTY5NS1hMjUzYjUxNzgwNGMiLCJjdHMiOiJPQVVUSDJfR1JBTlRfU0VUIiwiYXV0aF9sZXZlbCI6MCwiYXVkaXRUcmFja2luZ0lkIjoiODdkY2RhNTktMDI1NS00MzM0LWI3NDAtMTE0M2IzZWIwOGU4LTE2MjExNjcwNjUiLCJpc3MiOiJodHRwczovL2NpYW1hbXBhcHBic2QuY2lhbS50ZWxrb21zZWwuY29tOjEwMDEwL29wZW5hbS9vYXV0aDIvdHNlbC9teXRlbGtvbXNlbC9tb2JpbGUiLCJ0b2tlbk5hbWUiOiJhY2Nlc3NfdG9rZW4iLCJ0b2tlbl90eXBlIjoiQmVhcmVyIiwiYXV0aEdyYW50SWQiOiJEQVBhaTh1U0xXTGxObzAwM3JDWjEwbG1mUk0uU1E5cmlqZEFaWV9NWTJhNjcxR29pQ0NKS2tjIiwibm9uY2UiOiJ0cnVlIiwiYXVkIjoiODM1ODYyOGQ4YTA3MGIwZjQ3MmZjYmQ0ZGVmNGJhN2QiLCJuYmYiOjE1ODgxNTI2NTksImdyYW50X3R5cGUiOiJhdXRob3JpemF0aW9uX2NvZGUiLCJzY29wZSI6WyJvcGVuaWQiLCJwcm9maWxlIl0sImF1dGhfdGltZSI6MTU4ODE1MjY1OCwicmVhbG0iOiIvdHNlbC9teXRlbGtvbXNlbC9tb2JpbGUiLCJleHAiOjE1ODgyMzkwNTksImlhdCI6MTU4ODE1MjY1OSwiZXhwaXJlc19pbiI6ODY0MDAsImp0aSI6IkRBUGFpOHVTTFdMbE5vMDAzckNaMTBsbWZSTS5zb3NkZWxfVERiT2t3eXVCem1Ba3BzRTdxSU0ifQ.sc8q5uZ8_3-Wu9emXHYpXShxX6Egbs52xJFB2a1sLDq7ssSMHdLjYMxHgcKqLUTdCwrJIWAOJZZQlAXKZRN057W_PZsJVymCDDz5hU5tKGj8MW__dMxWvc4-pKfxRw9Q5RsTAwU6S5nsBFNmP2NUgKkFb1NFEpL-KdpnzUriUMtDLSPIyhCMvxiqAQ_kIZjHdApurxYO3jOXlyisOPy0di46roW3QWJ3HhdHRMEKb_2lmUT7JQIx9csCXXISVqOvD1IXutEHAAbX0f9W7rCGHToEql65CTiGS_EZdZC1Vj_dQtmQWrKLaJPYhBBHPrAMysxqfSfgD8BBjBSeyWh0cw', 'ch1@admin.net', 'eyJ0eXAiOiJKV1QiLCJraWQiOiJ3VTNpZklJYUxPVUFSZVJCL0ZHNmVNMVAxUU09IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiOHMtVDU5Ym05UnVYV1FzbmtCSXQ5USIsInN1YiI6IjEzN2ViOGExLTgwY2ItNGY1MC1hNjk1LWEyNTNiNTE3ODA0YyIsIm9sZFVpZCI6IjEzN2ViOGExLTgwY2ItNGY1MC1hNjk1LWEyNTNiNTE3ODA0YyIsImF1ZGl0VHJhY2tpbmdJZCI6Ijg3ZGNkYTU5LTAyNTUtNDMzNC1iNzQwLTExNDNiM2ViMDhlOC0xNjIxMTY3MDY5IiwiaXNzIjoiaHR0cHM6Ly9jaWFtYW1wYXBwYnNkLmNpYW0udGVsa29tc2VsLmNvbToxMDAxMC9vcGVuYW0vb2F1dGgyL3RzZWwvbXl0ZWxrb21zZWwvbW9iaWxlIiwidG9rZW5OYW1lIjoiaWRfdG9rZW4iLCJnaXZlbl9uYW1lIjoiRGltYXMiLCJ1dWlkIjoiMTM3ZWI4YTEtODBjYi00ZjUwLWE2OTUtYTI1M2I1MTc4MDRjIiwibm9uY2UiOiJ0cnVlIiwiYXVkIjoiODM1ODYyOGQ4YTA3MGIwZjQ3MmZjYmQ0ZGVmNGJhN2QiLCJjX2hhc2giOiJHako5VWF3M2pVZkp4ZlcxdlFkNFRBIiwiYWNyIjoiMCIsIm9yZy5mb3JnZXJvY2sub3BlbmlkY29ubmVjdC5vcHMiOiJZUGNuZWQ4RW5HdjBGc1VPcERIRTdvWk53VGMiLCJhenAiOiI4MzU4NjI4ZDhhMDcwYjBmNDcyZmNiZDRkZWY0YmE3ZCIsImF1dGhfdGltZSI6MTU4ODE1MjY1OCwicmVhbG0iOiIvdHNlbC9teXRlbGtvbXNlbC9tb2JpbGUiLCJtc2lzZG4iOiIrNjI4MTM1NzE2NzM0MiIsImV4cCI6MTU4ODIzOTA1OSwidG9rZW5UeXBlIjoiSldUVG9rZW4iLCJmYW1pbHlfbmFtZSI6Ikxhbmpha2EiLCJpYXQiOjE1ODgxNTI2NTl9.NKTu8ezY6QPyuzzWjZe_yGRBuqmFUVaZLOGuKRV5lYRw7pWw20nyRdInbHYbYnC-EJOg5bxgfCSs4g32k0NHVeIp3EUHyD5aJapkPivXgTdY6JtWCtQBEYG6y_K343p9_g-SZfbXJ6mhfxpf3qiWoB9Muq9WOpjJ-hmPwAGys_fHjGLHIrUeOM21TfvU_Aeb1u_zOydVDomrZ7MiQcsOzq4YGvqHobuK_bz2t_sEbkbofQxm-M9ZiL7UGTZeUJP-Hg8GZGADZjuRuC0Ce-YgjffrwCuDd5kMgKxvGt0upAeWlx5iZ1ngf1R-ReV54VuhQqLH6EzJKKparF4XCNDkWA');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pkg`
--

CREATE TABLE `pkg` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(255) NOT NULL,
  `status` set('active','inactive') NOT NULL DEFAULT 'active',
  `created` datetime DEFAULT current_timestamp(),
  `buyedby` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `pkg`
--

INSERT INTO `pkg` (`id`, `name`, `code`, `status`, `created`, `buyedby`) VALUES
(1, 'Weekend Deal', '672cae0fa7430fd10feacce4bd52ef4e', 'active', '2020-04-13 18:34:02', NULL),
(3, 'Kejutan GamesMAX', '3d8482f087636c2768889ab9b964be71', 'active', '2020-04-13 20:25:34', NULL),
(5, 'Jagoan Serbu SMS', '4ec20a6d82537ac40957cf59443d8a97', 'active', '2020-04-15 05:55:56', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `userdata`
--

CREATE TABLE `userdata` (
  `id` int(11) NOT NULL,
  `display_name` varchar(255) NOT NULL DEFAULT 'user',
  `email` varchar(255) NOT NULL DEFAULT 'default@webmanajemen.com',
  `username` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created` datetime DEFAULT current_timestamp(),
  `number` text DEFAULT NULL,
  `last_login` datetime DEFAULT current_timestamp(),
  `role` set('admin','client','superadmin') NOT NULL DEFAULT 'client'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='User Profile and login information';

--
-- Dumping data untuk tabel `userdata`
--

INSERT INTO `userdata` (`id`, `display_name`, `email`, `username`, `password`, `created`, `number`, `last_login`, `role`) VALUES
(1, 'dimas', 'default@webmanajemen.com', 'dimaslanjaka', 'lpsyEQWLMAaInjvAQs+b7g==', '2020-04-10 06:43:32', NULL, '2020-05-03 11:30:28', 'superadmin'),
(2, 'client', 'default@webmanajemen.com', 'client', 'KwNE2VY0L/4w3b+6W1uAVA==', '2020-04-15 05:11:26', NULL, '2020-04-15 05:30:50', 'client');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `data_msisdn`
--
ALTER TABLE `data_msisdn`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `msisdn` (`msisdn`);

--
-- Indeks untuk tabel `pkg`
--
ALTER TABLE `pkg`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `CodeUnique` (`code`) USING BTREE;

--
-- Indeks untuk tabel `userdata`
--
ALTER TABLE `userdata`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `data_msisdn`
--
ALTER TABLE `data_msisdn`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1681;

--
-- AUTO_INCREMENT untuk tabel `pkg`
--
ALTER TABLE `pkg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `userdata`
--
ALTER TABLE `userdata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
