ALTER TABLE news_shadowing
    ADD CONSTRAINT fk_news_shadowing_news FOREIGN KEY (news_id) REFERENCES news (id);