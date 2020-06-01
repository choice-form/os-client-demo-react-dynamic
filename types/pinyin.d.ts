// https://github.com/hotoo/pinyin
// 没有直接安装这个包,而是使用了它文档中提供的web-pinyin放到了library文件夹中

interface IPinyinOptions {
  style: string;
}


interface IPinyin {
  (text: string, options: IPinyinOptions): string[][];
  STYLE_NORMAL: string;
}

declare module 'web-pinyin' {
  const pinyin: IPinyin;
  export default pinyin;
}