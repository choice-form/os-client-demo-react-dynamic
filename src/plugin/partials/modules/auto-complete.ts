
import pinyin from 'web-pinyin';

interface IPinyinMatch {
  full: string;
  head: string;
  mix: string;
}

type IPinyinRule = 'partial' | 'start' | 'full';

interface IAutoCptlResult {
  existed: string[];
  results: CFAutoCpltData[];
}

/**
 * 获得自动提示项目
 * @param text 文字
 * @param existed 已有的值
 * @param source 自动提示数据源
 * @param rule 匹配规则
 * @param isSimple 是否简单匹配
 */
export function getAutoCompleteData(text: string, existed: string[], source: CFAutoCpltData[],
  rule: IPinyinRule, isSimple: boolean = false): IAutoCptlResult {
  if (!text) {
    return { results: [], existed: [] };
  }
  const patterns = [text, text.replace(/['\s]/g, '')];
  const results = source.reduce((finale, record) => {
    return compareWith(record, patterns, existed, rule, isSimple)
      ? finale.concat({ ...record })
      : finale;
  }, [] as CFAutoCpltData[]);
  return { results, existed };
}

/**
 * 是否能匹配自动提示组中的内容
 * @param record 自动提示组
 * @param patterns 用于尝试匹配的字符组
 * @param existed 已存在的字符组
 * @param rule 匹配规则
 * @param isSimple 是否简单匹配
 */
function compareWith(record: CFAutoCpltData, patterns: string[],
  existed: string[], rule: IPinyinRule, isSimple: boolean): boolean {
  const { name, triggers } = record;
  if (existed.includes(name)) {
    return false;
  }
  const matcher = isSimple ? matchSimple : matchComplex;
  return patterns.some(pattern => {
    return (
      matcher(pattern, name.toLowerCase(), rule) ||
      triggers.some(t => matcher(pattern, String(t).toLowerCase(), rule))
    );
  });
}

/**
 * 简单模式师傅能匹配
 * @param pattern 字符组
 * @param value 字符组
 */
function matchSimple(pattern: string, value: string): boolean {
  const lh = pattern.toLowerCase().replace(/\s+/g, '');
  const rh = value.toLowerCase().replace(/\s+/g, '');
  return lh === rh;
}

/**
 * 比较两个组字符的拼音是否能模糊匹配
 * @param pattern 源字符组
 * @param value 比较字符组
 * @param rule 比较规则
 */
function matchComplex(pattern: string,
  value: string, rule: IPinyinRule = 'full'): boolean {
  const matchFn = MATCHING_RULES[rule];
  const patternPY = getPinyin(pattern);
  const valuePY = getPinyin(value);
  if (patternPY && valuePY) {
    // 当输入值为汉字且目标也为汉字时,不要用拼音首字母匹配
    // 否则输入'八戒'会能匹配所有bj开的的词组,如暴君,布甲等.
    // 只有一边是汉字的时候才开启首字母匹配
    return (
      matchFn(patternPY.full, valuePY.full) ||
      matchFn(patternPY.mix, valuePY.mix)
    );
  } else if (patternPY) {
    return (
      matchFn(patternPY.full, value) ||
      matchFn(patternPY.head, value) ||
      matchFn(patternPY.mix, value)
    );
  } else if (valuePY) {
    return (
      matchFn(pattern, valuePY.full) ||
      matchFn(pattern, valuePY.head) ||
      matchFn(pattern, valuePY.mix)
    );
  } else {
    return matchFn(pattern, value);
  }
}

const MATCHING_RULES = {
  partial: (value, targetValue) => targetValue.indexOf(value) > -1,
  start: (value, targetValue) => targetValue.indexOf(value) === 0,
  full: (value, targetValue) => targetValue === value,
};

/**
 * 尝试获取汉字的拼音
 * @param text 汉字
 */
function getPinyin(text: string): IPinyinMatch {
  if (!text.match(/[\u4e00-\u9fa5]/)) {
    return null;
  }
  let full = '';
  let mix = '';
  let head = '';
  const char = text.replace(/[^\u4e00-\u9fa5]/g, '');
  pinyin(char, { style: pinyin.STYLE_NORMAL })
    .forEach(group => {
      const py = group.join('');
      full += py;
      mix += mixNasal(py);
      head += py[0];
    });

  return { full, mix, head };
}
/**
 * 混淆前后鼻音
 * @param char 拼音符
 */
function mixNasal(char: string): string {
  return CONSNANTS_LIST.reduce((item, consonant) => {
    return item.replace(consonant.nasal, consonant.velar);
  }, char);
}

const CONSNANTS_LIST = [
  { velar: 'an', nasal: 'ang' },
  { velar: 'en', nasal: 'eng' },
  { velar: 'in', nasal: 'ing' },
  { velar: 'on', nasal: 'ong' },
  { velar: 'un', nasal: 'ung' },
];
