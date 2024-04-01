// 히라가나 -> 한글 대조표
const hirakoChecklist: { [key: string]: string } = {
  あ: "아",
  い: "이",
  う: "우",
  え: "에",
  お: "오",
  か: "카",
  き: "키",
  く: "쿠",
  け: "케",
  こ: "코",
  さ: "사",
  し: "시",
  す: "스",
  せ: "세",
  そ: "소",
  た: "타",
  ち: "치",
  つ: "츠",
  て: "테",
  と: "토",
  な: "나",
  に: "니",
  ぬ: "누",
  ね: "네",
  の: "노",
  は: "하",
  ひ: "히",
  ふ: "후",
  へ: "헤",
  ほ: "호",
  ま: "마",
  み: "미",
  む: "무",
  め: "메",
  も: "모",
  や: "야",
  ゆ: "유",
  よ: "요",
  ら: "라",
  り: "리",
  る: "루",
  れ: "레",
  ろ: "로",
  わ: "와",
  を: "오",
  ん: "응",
  ぁ: "아",
  ぃ: "이",
  ぅ: "우",
  ぇ: "에",
  ぉ: "오",
  っ: "츠",
  ゃ: "야",
  ゅ: "유",
  ょ: "요",
  が: "가",
  ぎ: "기",
  ぐ: "구",
  げ: "게",
  ご: "고",
  ざ: "자",
  じ: "지",
  ず: "즈",
  ぜ: "제",
  ぞ: "조",
  だ: "다",
  ぢ: "지",
  づ: "즈",
  で: "데",
  ど: "도",
  ば: "바",
  び: "비",
  ぶ: "부",
  べ: "베",
  ぼ: "보",
  ぱ: "파",
  ぴ: "피",
  ぷ: "푸",
  ぺ: "페",
  ぽ: "포",
  ゔ: "부",
};
// 발음 병합 유니코드 대조표 (しゅっか: 시유츠카 -> 슛카)
const underUnicode: { [key: string]: number } = {
  ゃ: -504,
  ゅ: -84,
  ょ: -224,
  ん: 4,
  ぃ: 420,
  っ: 19,
  ぁ: -364,
};

// 발음 병합 함수
const mergeKor = (letter: string, prev: string) => {
  const prevCode = prev.charCodeAt(0);
  const changed = prevCode + underUnicode[letter];
  return String.fromCharCode(changed);
};

// 일->한 변환 함수
export const JptoKor = (word: string) => {
  const changed: string[] = [];
  const underRegex = /[ゃゅょんぃっぁ]/;

  for (let i = 0; i < word.length; i++) {
    const letter = word.charAt(i);
    if (underRegex.test(letter) && changed.length > 0) {
      let replaced: string = "";
      replaced = mergeKor(letter, changed[changed.length - 1]);
      changed.pop();
      changed.push(replaced);
    } else {
      if (hirakoChecklist[letter]) {
        changed.push(hirakoChecklist[letter]);
      } else {
        changed.push(letter);
      }
    }
  }

  return changed.join("");
};

// 막대기 변환 - 예시: ろーどー -> ろうどう
const changeStick = (prev: string) => {
  const aGyou = /[アカガサザタダナハバパマヤラワ]/;
  const ieGyou = /[イキギシジチヂニヒビピミリエケゲセゼテデネヘベペメレ]/;
  const uGyou =
    /[ウクグスズツヅヌフブプムユヨルオコゴソゾトドノホボポモロョュ]/;

  if (aGyou.test(prev)) {
    return "あ";
  } else if (ieGyou.test(prev)) {
    return "い";
  } else if (uGyou.test(prev)) {
    return "う";
  } else {
    return "";
  }
};

// 가타카나 -> 히라가나 변환 함수
export const KanaToHira = (word: string) => {
  const jpRegEx = /[ァ-ヴ]/g;

  return word
    .replace(jpRegEx, (matched) =>
      String.fromCharCode(matched.charCodeAt(0) - 96)
    )
    .replace(/ー/g, (_matched, index) => changeStick(word.charAt(index - 1)));
};

// 단어장 표시할 단어 품사 거르는 함수
export const hasMeaning = (wordType: string) => {
  if (
    wordType.startsWith("名詞") ||
    wordType.startsWith("動詞") ||
    wordType.startsWith("接尾辞") ||
    wordType.startsWith("形状詞")
  ) {
    return true;
  } else {
    return false;
  }
};
