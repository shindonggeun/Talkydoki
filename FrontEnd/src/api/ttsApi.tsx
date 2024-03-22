import { useQueries, useQuery } from "@tanstack/react-query";
import {
  PollyClient,
  SynthesizeSpeechCommandInput,
  SynthesizeSpeechCommand,
} from "@aws-sdk/client-polly";

const {
  VITE_AWS_ACCESS_KEY_ID,
  VITE_AWS_ACCESS_KEY_ID_APP_AWS_SECRET_ACCESS_KEY,
} = import.meta.env;

const region = "us-east-1";

const fetchTTS = async (text: string) => {
  const client = new PollyClient({
    region,
    credentials: {
      accessKeyId: VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: VITE_AWS_ACCESS_KEY_ID_APP_AWS_SECRET_ACCESS_KEY,
    },
  });

  const params: SynthesizeSpeechCommandInput = {
    Text: text,
    OutputFormat: "mp3",
    LanguageCode: "ja-JP",
    VoiceId: "Takumi",
  };

  return client.send(new SynthesizeSpeechCommand(params)).then(async (res) => {
    if (res.$metadata.httpStatusCode == 200) {
      const { AudioStream } = res;

      // ReadableStream을 Web Stream으로 변환
      const webStream = AudioStream.transformToWebStream();

      // Blob으로 변환
      const response = new Response(webStream);
      const audioBlob = await response.blob();

      // Blob을 이용해 오디오 URL 생성
      const audioUrl = URL.createObjectURL(audioBlob);
      return audioUrl;
    } else {
      return "";
    }
  });
};

export const useGetWholeTTS = (newsId: number, textList: string[]) => {
  return useQueries({
    queries: textList.map((text, idx) => ({
      queryKey: ["getVoice", newsId, idx],
      queryFn: () => fetchTTS(text),
      staleTime: Infinity,
      gcTime: Infinity,
    })),
    combine: (results) => {
      return results.map((each) => each.data);
    },
  });
};

export const useGetTTS = (newsid: number, index: number, text: string) => {
  return useQuery({
    queryKey: ["getVoice", newsid, index],
    queryFn: () => fetchTTS(text),

    staleTime: Infinity,
    gcTime: Infinity,
  });
};
