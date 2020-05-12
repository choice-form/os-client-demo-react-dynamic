// https://github.com/hotoo/pinyin

interface IPinyinOptions {
  style: string;
}


interface IPinyin {
  (text: string, options: IPinyinOptions): string[][];
  STYLE_NORMAL: string;
}

declare module 'pinyin' {
  const pinyin: IPinyin;
  export default pinyin;
}