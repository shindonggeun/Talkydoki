ALTER TABLE `personal_vocabulary`
DROP FOREIGN KEY `FK_personal_vocabulary_member_id`,
ADD CONSTRAINT `FK_personal_vocabulary_member_id_cascade` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE CASCADE;

