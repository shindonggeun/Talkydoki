ALTER TABLE `news_keyword_history`
DROP INDEX `UK_news_keyword_history_keyword_id`,
DROP FOREIGN KEY `FK_news_keyword_history_keyword_id`,
    ADD KEY `FK_news_keyword_history_keyword_id_new` (`keyword_id`),
    ADD CONSTRAINT `FK_news_keyword_history_keyword_id_new` FOREIGN KEY (`keyword_id`) REFERENCES `keyword` (`id`);
