ALTER TABLE `personal_vocabulary`
DROP FOREIGN KEY `FK_personal_vocabulary_member_id`,
     ADD KEY `FK_personal_vocabulary_member_id_new` (`member_id`),
    ADD CONSTRAINT `FK_personal_vocabulary_member_id_new` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE CASCADE;

