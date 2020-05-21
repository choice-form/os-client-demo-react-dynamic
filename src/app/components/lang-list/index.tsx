import React from 'react';

interface IProps {
  handler: CFUIEventHandler;
  langTable: CFLangTableItem[];
  language: string;
}

/**
 * 问卷内容多语言切换组件
 */
class LangList extends React.Component<IProps>{
  handleLangChange(id: string): void {
    const { handler, langTable } = this.props;
    const item = langTable.find(temp => temp.id === id);
    handler.handleLangChange(item);
  }
  render(): JSX.Element {
    const { langTable, language } = this.props;
    if (!langTable || langTable.length <= 1) {
      return null;
    }
    return <div>
      <select value={language}
        onChange={(e) => this.handleLangChange(e.target.value)}>
        {langTable.map(lang => {
          return <option key={lang.id} value={lang.id}>{lang.value}</option>
        })}
      </select>
    </div>
  }
}

export default LangList;