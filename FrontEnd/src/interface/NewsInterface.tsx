export interface NewsListItemInterface {
  newsId: number;
  title: string;
  titleTranslated: string;
  category: string;
  writeDate: string;
  srcOrigin: string;
}

export interface NewsListInterface {
  contents: NewsListItemInterface[];
  hasNext: boolean;
}
