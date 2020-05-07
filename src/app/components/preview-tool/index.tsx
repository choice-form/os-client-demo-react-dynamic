import React from 'react';
import { T } from '../../../utils/i18n';

type ITabName = 'bookmark' | 'time';

interface IState {
  bookmarkName: string;
  currentTab: ITabName;
  timeTestName: string;
}
interface IProps {
  model: CFPreviewTool;
}

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
  changeBookMarkName(name: string): void {
    return this.setState({ bookmarkName: name });
  }
  /**
   * 更改激活的tab
   * @param name tab名称
   */
  changeTab(name: ITabName): void {
    this.setState({ currentTab: name });
  }
  /**
   * 渲染
   */
  render(): JSX.Element {
    const { model } = this.props;
    // const { time, history } = model;
    return <div className='preview-tool'>
      <div className='preview-tool_trigger'
        onClick={() => model.handleToggleOpen()}>
        {model.opened ? 'X' : 'O'}
      </div>
      {model.opened
        ? <div className='preview-tool_main'>
          <div className='preview-tool_header'>
            <div onClick={() => this.changeTab('bookmark')}>
              {T(LANG.preview.bookmark.title)}
            </div>
            <div onClick={() => this.changeTab('time')}>
              {T(LANG.preview.time.title)}
            </div>
          </div>
          {this.state.currentTab === 'bookmark'
            ? <div className='preview-tool_bookmark'>
            </div>
            : <div className='preview-tool_bookmark'>
              <h2>{T(LANG.preview.bookmark.title)}</h2>
              <p>
                <input type="text"
                  value={this.state.bookmarkName}
                  onChange={(e) => this.changeBookMarkName(e.target.value)}
                  placeholder={T(LANG.preview.bookmark.input)} />
                <button>{T(LANG.preview.bookmark.add)}</button>
              </p>
              <div>
                <h3>{T(LANG.preview.bookmark.about)}</h3>
                <p>{T(LANG.preview.bookmark.detail)}</p>
              </div>
            </div>
          }


        </div>
        : null
      }
    </div>
  }
}

export default PreviewTool;