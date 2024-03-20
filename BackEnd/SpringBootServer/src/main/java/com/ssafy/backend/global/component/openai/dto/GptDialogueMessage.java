package com.ssafy.backend.global.component.openai.dto;

/**
 * GPT와의 대화에서 사용되는 메시지를 나타내는 레코드입니다.
 * 'role' 필드는 메시지의 발신자를 나타내며, 'user' 또는 'gpt'일 수 있습니다.
 * 'content' 필드는 메시지의 내용을 담고 있습니다.
 */
public record GptDialogueMessage(
        String role,
        String content
) {}
