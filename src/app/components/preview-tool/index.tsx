import React from 'react';
import { T, LANG } from '../../../utils/i18n';

type ITabName = 'bookmark' | 'time';

interface IState {
  /**
   * 预览书签名
   */
  bookmarkName: string;
  /**
   * 当前选中的tab名称
   */
  currentTab: ITabName;
  /**
   * 时间预览者名称
   */
  timeTestName: string;
}
interface IProps {
  model: CFPreviewTool;
}

/**
 * 预览工具组件,包含预览时间和预览书签
 */
class PreviewTool extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentTab: 'bookmark',
      bookmarkName: '',
      timeTestName: '',
    }
  }
  /**
   * 更改书签名
   * @param name
   */
  handleBookmarkNameChange(name: string): void {
    return this.setState({ bookmarkName: name });
  }
  /**
   * 更改激活的tab
   * @param name tab名称
   */
  handleTabChange(name: ITabName): void {
    this.setState({ currentTab: name });
  }
  /**
   * 更改时间测试名
   * @param name
   */
  handleTimeTestNameChange(name: string): void {
    return this.setState({ timeTestName: name });
  }
  /**
   * 渲染预览工具
   */
  render(): JSX.Element {
    const { model } = this.props;
    const { time, history } = model;
    return <div className={"preview-tool" + (model.opened ? ' opened' : '')}>
      {/* 开关 */}
      <div className='trigger'
        onClick={() => model.handleToggleOpen()}>
        {model.opened ? 'ㄨ' : 'ㄓ'}
      </div>
      {/* 主体 */}
      {model.opened
        // 打开了才渲染主体
        ? <div className='main'>
          {/* tab头部 */}
          <div className='header'>
            <div onClick={() => this.handleTabChange('bookmark')}
              className={this.state.currentTab === 'bookmark' ? 'active' : null}>
              {T(LANG.preview.bookmark.title)}
            </div>
            <div onClick={() => this.handleTabChange('time')}
              className={this.state.currentTab === 'time' ? 'active' : null}>
              {T(LANG.preview.time.title)}
            </div>
          </div>
          {this.state.currentTab === 'bookmark'
            // 书签栏
            ? <div className='bookmark'>
              <h2>{T(LANG.preview.bookmark.title)}</h2>
              <p>
                <input type="text"
                  value={this.state.bookmarkName}
                  onChange={(e) => this.handleBookmarkNameChange(e.target.value)}
                  placeholder={T(LANG.preview.bookmark.input)} />
                <button onClick={() => {
                  history.handleSaveHistories(this.state.bookmarkName)
                }}>
                  {T(LANG.preview.bookmark.add)}
                </button>
              </p>
              <h3>{T(LANG.preview.bookmark.about)}</h3>
              <p>{T(LANG.preview.bookmark.detail)}</p>
              <ul>
                {history.histories.map(hstry => {
                  return <li key={hstry.id}>
                    <span>{hstry.name}</span>
                    <button onClick={() => history.handleImportHistory(hstry)}>
                      {T(LANG.preview.bookmark.apply)}
                    </button>
                    <button onClick={() => history.handleDeleteHistory(hstry)}>
                      {T(LANG.preview.bookmark.delete)}
                    </button>
                  </li>
                })}
              </ul>
              <h3>{T(LANG.preview.bookmark.history)}</h3>
              <p>{T(LANG.preview.bookmark.historyDetail)}</p>
              <ul>
                {history.nodeList.map(node => {
                  return <li key={node.renderId}>
                    <span>{node.title}</span>
                    <button onClick={() => history.handlePickNode(node)}>
                      {T(LANG.preview.bookmark.revertTo)}
                    </button>
                  </li>
                })}
              </ul>
            </div>
            // 时间测试栏
            : <div className='time'>
              <h2>{T(LANG.preview.time.title)}</h2>
              <p>
                <input type="text"
                  value={this.state.timeTestName}
                  onChange={(e) => this.handleTimeTestNameChange(e.target.value)}
                  placeholder={T(LANG.preview.bookmark.input)} />
                <button onClick={() => {
                  time.handleUpload(this.state.timeTestName)
                }}>
                  {T(LANG.preview.time.upload)}
                </button>
              </p>
              <h3>{T(LANG.preview.time.about)}</h3>
              <p>{T(LANG.preview.time.detail)}</p>
              <h3 className='time-title'>
                <span>{T(LANG.preview.time.total)}</span>
                <span>
                  {T(LANG.preview.time.cost, { amount: time.timeInfo.allTime / 1000 })}
                </span>
              </h3>
              <ul>
                {time.timeInfo.displayList.map(item => {
                  return <li key={item.name}>
                    <span>{item.name}</span>
                    <span>
                      {T(LANG.preview.time.cost, { amount: item.time / 1000 })}
                    </span>
                  </li>
                })}
              </ul>
            </div>
          }
        </div>
        : null
      }
    </div>
  }
}

export default PreviewTool;