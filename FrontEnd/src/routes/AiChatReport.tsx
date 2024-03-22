import ChatReportChart from "@/components/Aichat/ChatReport/ChatReportChart";
import {
  ChatReportCard,
  ChatReportSection,
  ChatReportTitleSection,
  ChatReportChartSection,
} from "@/styles/Aichat/AiChatReport";
import { Wrapper } from "@/styles/common/ui/container";

type Props = {};

function AiChatReport({}: Props) {
  // const report = {
  //   id: 1,
  //   aiChatRoomId: 1,
  //   conversationSummary:
  //     "사람들이 사단 무호흡 선생님과 대화하는 것 같습니다. 사용되는 어휘와 문맥은 매우 단순하며 비자연스럽습니다.",
  //   vocabularyScore: "2.0",
  //   vocabularyReport:
  //     "다양성, 정확성, 적절성을 기준으로 평가합니다. 다양성은 다양한 어휘를 사용하여 풍부한 표현을 하는지 평가합니다. 정확성은 어휘의 의미를 정확하게 이해하고 사용하는지 평가합니다. 적절성은 상황에 맞는 어휘를 선택하여 사용하는지 평가합니다.",
  //   grammarScore: "3.0",
  //   grammarReport:
  //     "문법 규칙, 문장 구조, 문장의 완성도를 기준으로 평가합니다. 문법규칙은 문법 규칙 (어순, 조사, 어미 등)을 정확하게 사용하는지 평가합니다. 문장 구조는 문장 구조 (주어, 목적어, 동사 등)가 정확한지 평가합니다. 문장의 완성도는 문장이 완성되어 있는지 평가합니다.",
  //   wordScore: "4.0",
  //   wordSReport:
  //     "형태, 변형, 맞춤법을 기준으로 평가합니다. 형태는 단어의 형태 (명사, 동사, 형용사, 부사 등)를 정확하게 사용하는지 평가합니다. 변형은 단어의 활용 (동사의 활용, 형용사의 活用 등)을 정확하게 하는지 평가합니다. 맞춤법은 단어의 맞춤법을 정확하게 쓰는지 평가합니다.",
  //   FluencyScore: "1.0",
  //   FluencyReport:
  //     "자연스러움, 구조, 연결을 기준으로 평가합니다. 자연스러움은 문장이 자연스럽게 흐르는지 평가합니다. 구조는 문장의 구조 (주어, 목적어, 동사 등)가 정확한지 평가합니다. 연결은 문장과 문장 사이를 매끄럽게 연결하는지 평가합니다.",
  //   ContextScore: "5.0",
  //   ContextReport:
  //     "주제, 상황, 의도의 기준으로 평가합니다. 주제는 주제를 명확하게 파악하고 벗어나지 않고 있는지 평가합니다. 상황은 상황에 맞는 내용을 작성하고 있는지 평가합니다. 의도는 작성자의 의도를 명확하게 전달하고 있는지 평가합니다.",
  // };
  return (
    <>
      <Wrapper>
        <ChatReportCard>
          <ChatReportTitleSection>AI 회화 리포트</ChatReportTitleSection>
          <ChatReportChartSection>
            <ChatReportChart />
          </ChatReportChartSection>
          <ChatReportSection>채팅 리뷰</ChatReportSection>
        </ChatReportCard>
      </Wrapper>
    </>
  );
}

export default AiChatReport;
