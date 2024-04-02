CREATE TABLE `member` (
                          `id` int unsigned NOT NULL AUTO_INCREMENT,
                          `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                          `email` varchar(255) NOT NULL,
                          `name` varchar(255) NOT NULL,
                          `nickname` varchar(255) NOT NULL,
                          `provider` enum('KAKAO','NAVER','GOOGLE') DEFAULT NULL,
                          `password` varchar(255) DEFAULT NULL,
                          `profile_image` varchar(255) DEFAULT NULL,
                          `role` enum('USER','ADMIN') NOT NULL,
                          PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=310 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `news` (
                        `id` int unsigned NOT NULL AUTO_INCREMENT,
                        `category` enum('SOCIETY','WEATHER_DISASTER','SCIENCE_CULTURE','POLITICS','BUSINESS','INTERNATIONAL','SPORTS','LIFE') NOT NULL,
                        `content` text NOT NULL,
                        `content_translated` text NOT NULL,
                        `src_origin` varchar(255) NOT NULL,
                        `summary` text NOT NULL,
                        `summary_translated` text NOT NULL,
                        `title` text NOT NULL,
                        `title_translated` text NOT NULL,
                        `write_date` timestamp NOT NULL,
                        PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=574 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `keyword` (
                           `id` int unsigned NOT NULL AUTO_INCREMENT,
                           `japanese` varchar(255) NOT NULL,
                           `korean` varchar(255) DEFAULT NULL,
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10015 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `vocabulary` (
                              `id` int unsigned NOT NULL AUTO_INCREMENT,
                              `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                              `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                              `japanese` varchar(50) NOT NULL,
                              `japanese_read` varchar(50) NOT NULL,
                              `korean` varchar(200) NOT NULL,
                              `type` varchar(50) DEFAULT NULL,
                              PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8299 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `news_image` (
                              `id` int unsigned NOT NULL AUTO_INCREMENT,
                              `image_url` varchar(255) NOT NULL,
                              `news_id` int unsigned DEFAULT NULL,
                              PRIMARY KEY (`id`),
                              KEY `FK_news_image_news_id` (`news_id`),
                              CONSTRAINT `FK_news_image_news_id` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=933 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `news_keyword_mapping` (
                                        `id` int unsigned NOT NULL AUTO_INCREMENT,
                                        `weight` decimal(6,4) DEFAULT NULL,
                                        `keyword_id` int unsigned DEFAULT NULL,
                                        `news_id` int unsigned DEFAULT NULL,
                                        PRIMARY KEY (`id`),
                                        KEY `FK_news_keyword_mapping_news_id` (`news_id`),
                                        KEY `FK_news_keyword_mapping_keyword_id` (`keyword_id`),
                                        CONSTRAINT `FK_news_keyword_mapping_news_id` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`),
                                        CONSTRAINT `FK_news_keyword_mapping_keyword_id` FOREIGN KEY (`keyword_id`) REFERENCES `keyword` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2813 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `news_keyword_history` (
                                        `id` int unsigned NOT NULL AUTO_INCREMENT,
                                        `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                        `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                        `read_count` int NOT NULL,
                                        `keyword_id` int unsigned DEFAULT NULL,
                                        `member_id` int unsigned DEFAULT NULL,
                                        PRIMARY KEY (`id`),
                                        UNIQUE KEY `UK_news_keyword_history_keyword_id` (`keyword_id`),
                                        KEY `FK_news_keyword_history_member_id` (`member_id`),
                                        CONSTRAINT `FK_news_keyword_history_keyword_id` FOREIGN KEY (`keyword_id`) REFERENCES `keyword` (`id`),
                                        CONSTRAINT `FK_news_keyword_history_member_id` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=354 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `news_shadowing` (
                                  `id` int unsigned NOT NULL AUTO_INCREMENT,
                                  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                  `member_id` int unsigned DEFAULT NULL,
                                  `news_id` int unsigned DEFAULT NULL,
                                  PRIMARY KEY (`id`),
                                  KEY `FK_news_shadowing_news_id` (`news_id`),
                                  KEY `FK_news_shadowing_member_id` (`member_id`),
                                  CONSTRAINT `FK_news_shadowing_news_id` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`),
                                  CONSTRAINT `FK_news_shadowing_member_id` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `shadowing_evaluation` (
                                        `id` int unsigned NOT NULL AUTO_INCREMENT,
                                        `score` double NOT NULL,
                                        `news_shadowing_id` int unsigned DEFAULT NULL,
                                        PRIMARY KEY (`id`),
                                        KEY `FK_shadowing_evaluation_news_shadowing_id` (`news_shadowing_id`),
                                        CONSTRAINT `FK_shadowing_evaluation_news_shadowing_id` FOREIGN KEY (`news_shadowing_id`) REFERENCES `news_shadowing` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ai_chat_room` (
                                `id` int unsigned NOT NULL AUTO_INCREMENT,
                                `category` enum('HOTEL_CHECK_IN', 'CHANGE_AT_CONVENIENCE_STORE','SOCCER_CONVERSATION','ORDER_HAMBURGER','HAIRCUT_AT_SALON','DESCRIBE_HEALTH_CONDITION_AT_HOSPITAL','FIND_LOST_ITEM_AT_POLICE_STATION','ENGAGE_IN_SOCIAL_DISCUSSION','BEFRIEND_A_COLLEAGUE','BRUNCH_CONVERSATION') NOT NULL,
                                `member_id` int unsigned DEFAULT NULL,
                                PRIMARY KEY (`id`),
                                KEY `FK_ai_chat_room_member_id` (`member_id`),
                                CONSTRAINT `FK_ai_chat_room_member_id` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ai_chat_history` (
                                   `id` int unsigned NOT NULL AUTO_INCREMENT,
                                   `content` text NOT NULL,
                                   `sender` enum('USER','GPT','USER_TIP') NOT NULL,
                                   `ai_chat_room_id` int unsigned NOT NULL,
                                   PRIMARY KEY (`id`),
                                   KEY `FK_ai_chat_history_ai_chat_room_id` (`ai_chat_room_id`),
                                   CONSTRAINT `FK_ai_chat_history_ai_chat_room_id` FOREIGN KEY (`ai_chat_room_id`) REFERENCES `ai_chat_room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=200 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ai_chat_feedback` (
                                    `id` int unsigned NOT NULL AUTO_INCREMENT,
                                    `content` text NOT NULL,
                                    `ai_chat_history_id` int unsigned DEFAULT NULL,
                                    PRIMARY KEY (`id`),
                                    UNIQUE KEY `UK_ai_chat_feedback_ai_chat_history_id` (`ai_chat_history_id`),
                                    CONSTRAINT `FK_ai_chat_feedback_ai_chat_history_id` FOREIGN KEY (`ai_chat_history_id`) REFERENCES `ai_chat_history` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ai_chat_report` (
                                  `id` int unsigned NOT NULL AUTO_INCREMENT,
                                  `context_score` float NOT NULL,
                                  `conversation_summary` varchar(255) NOT NULL,
                                  `fluency_score` float NOT NULL,
                                  `grammar_score` float NOT NULL,
                                  `vocabulary_score` float NOT NULL,
                                  `word_score` float NOT NULL,
                                  `ai_chat_room_id` int unsigned NOT NULL,
                                  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                  PRIMARY KEY (`id`),
                                  UNIQUE KEY `UK_ai_chat_report_ai_chat_room_id` (`ai_chat_room_id`),
                                  CONSTRAINT `FK_ai_chat_report_ai_chat_room_id` FOREIGN KEY (`ai_chat_room_id`) REFERENCES `ai_chat_room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `personal_vocabulary` (
                                       `id` int unsigned NOT NULL AUTO_INCREMENT,
                                       `member_id` int unsigned NOT NULL,
                                       `vocabulary_id` int unsigned DEFAULT NULL,
                                       PRIMARY KEY (`id`),
                                       UNIQUE KEY `UK_personal_vocabulary_vocabulary_id` (`vocabulary_id`),
                                       KEY `FK_personal_vocabulary_member_id` (`member_id`),
                                       CONSTRAINT `FK_personal_vocabulary_vocabulary_id` FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabulary` (`id`),
                                       CONSTRAINT `FK_personal_vocabulary_member_id` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `attendance` (
                              `id` int unsigned NOT NULL AUTO_INCREMENT,
                              `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                              `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                              `type` enum('NEWS_SHADOWING','AI_CHAT') DEFAULT NULL,
                              `member_id` int unsigned NOT NULL,
                              PRIMARY KEY (`id`),
                              KEY `FK_attendance_member_id` (`member_id`),
                              CONSTRAINT `FK_attendance_member_id` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;