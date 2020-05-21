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

/**
 * 因为utils中的模块会分别被主模块和插件模块加载
 * 而主模块和插件模块是分开构建,虽然他们一来的是同一本utils文件资源
 * 但是他们是在两个独立模块中一来进去的,所以其实依赖进来的是两个utils实例
 * 这两个实例内部数据是各自独立的,我们为了强行让这两个实例的语言共享
 *
 * 只好把他放到window上.
 *
 * 所以一般来说不要尝试把utils中的模块当时是共享数据的中心
 *
 * 这里这种情况非常罕见
 *
 * 如果这里定义局部变量则会无法共享
 */
window.__shared_language__ = 'zh_cn';


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
  window.__shared_language__ = lang.toLowerCase();
}

/**
 * 翻译
 * @param key 键名
 * @param options 参数
 */
export function T(key: string, options?: any): string {
  let dict = loadLang(window.__shared_language__);
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
  return `missing translation for ${key} ${window.__shared_language__}`;
}


