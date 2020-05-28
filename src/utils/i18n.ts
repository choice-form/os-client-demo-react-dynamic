import { I18n } from '@choiceform/os-client-core'
const mf = new I18n.MessageFormat();

// __i18n-custom-build-replace-start__

// 上面这个注释和下面结尾的注释非常重要,不要更改,因为自定以构建多语言的时候会寻找
// 这个标记,将这个两个标记之间的内容替换成真实构建内容.

/**
 * 多语言的资源地址,构建的时候会替换成真实地址
 */
export const zh_cn = '/assets/zh_cn.json';
export const en_us = '/assets/en_us.json';


/**
 * 多语言代号集合,先放一个空对象,构建的时候会把真实的集合放进来
 */
export const LANG: ILang = {} as ILang;

// 下面这个这个注释非常重要,是多语言自定义构建的查找标记,不要删除
// __i18n-custom-build-replace-end__



/**
 * 多语言资源配置
 * 花括号里面的这个注释使用是用于构建的识别码，不能更改
 */
const langSrcMap: { [key: string]: string } = {
  zh_cn,
  en_us
};

const langDict: { [key: string]: { [key: string]: any } } = {};

/**
 * 当前使用的语言
 */
let currentLang = 'zh_cn';

/**
 * 加载某个语言的翻译规则
 * @param lang
 */
function loadLang(lang: string): any {
  lang = lang.toLowerCase();
  let src = langSrcMap[lang];
  // 还没有该UI语言的话退回英语
  if (!src) {
    lang = 'en_us';
    src = langSrcMap[lang];
  }
  if (!langDict[lang]) {
    const req = new XMLHttpRequest();
    req.open('GET', src, false);
    req.send();
    langDict[lang] = JSON.parse(req.responseText);
  }
  return langDict[lang];
}


/**
 * 设置当前语言
 * @param lang 语言代码
 */
export function setLocale(lang: string): void {
  currentLang = lang.toLowerCase();
}

/**
 * 翻译
 * @param key 键名
 * @param options 参数
 */
export function T(key: string, options?: any): string {
  let dict = loadLang(currentLang);
  try {
    const keys = key.split('.');
    let part = keys.shift()
    while (part) {
      dict = dict[part];
      part = keys.shift();
    }
    const msg = mf.compile(dict);
    return msg(options);
  } catch (e) {
    // he
  }
  return `missing translation for ${key} ${currentLang}`;
}


