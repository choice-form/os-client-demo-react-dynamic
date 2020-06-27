import React from "react";

interface IProps {
  handler: CFUIEventHandler;
  langTable: CFLangTableItem[];
  language: string;
}

/**
 * 问卷内容多语言切换组件
 */
class LangList extends React.Component<IProps> {
  handleLangChange(id: string): void {
    const { handler, langTable } = this.props;
    const item = langTable.find((temp) => temp.id === id);
    handler.handleLangChange(item);
  }
  render(): JSX.Element {
    const { langTable, language } = this.props;
    if (!langTable || langTable.length <= 1) {
      return null;
    }
    return (
      <div className="relative mr-auto">
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M7 7l3-3 3 3m0 6l-3 3-3-3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <select
          className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-left bg-white border border-gray-300 rounded-md appearance-none cursor-default focus:outline-none focus:shadow-outline focus:border-blue-300"
          value={language}
          onChange={(e) => this.handleLangChange(e.target.value)}
        >
          {langTable.map((lang) => {
            return (
              <option key={lang.id} value={lang.id}>
                {lang.value}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default LangList;
