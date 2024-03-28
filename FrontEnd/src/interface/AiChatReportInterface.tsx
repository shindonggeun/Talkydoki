export interface reportDetailInterface {
  id: number;
  category: string;
  conversationSummary: string;
  vocabularyScore: number;
  grammarScore: number;
  wordScore: number;
  FluencyScore: number;
  ContextScore: number;
}

export interface chatWithFeedbackInterface {
  chatId: number;
  sender: string;
  message: string;
  feedback: string | null;
}

export interface chatReportResponseInterface {
  reportDetail: reportDetailInterface;
  chatsWithFeedback: chatWithFeedbackInterface[];
}
