import { I18n } from '@choiceform/os-client-core'


const mf = new I18n.MessageFormat();

/**
 * 多语言资源配置
 * 花括号里面的这个注释使用是用于构建的识别码，不能更改
 */
const langSrcMap: { [key: string]: string } = {
  'zh_cn': require('./../../lang/zh_cn').default,
  'en_us': require('./../../lang/en_us').default,
};

const langDict: { [key: string]: { [key: string]: any } } = {};


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
      part = keys.pop();
    }
    const msg = mf.compile(dict);
    return msg(options);
  } catch (e) {
    // he
  }
  return `missing translation for ${key} ${currentLang}`;
}


