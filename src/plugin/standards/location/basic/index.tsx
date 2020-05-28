import React from 'react';
import NodeHead from '../../../partials/components/basic/node-head';
import { T, LANG } from '../../../../utils/i18n';
import NodeBody from '../../../partials/components/basic/node-body';
import { locate } from '../../../partials/modules/locator';

interface IProps extends IQuesComBaseProps {
  node: CFLocateQuestion;
}

interface IState {
  status: string;
}

class LocationBasic extends React.Component<IProps, IState> {
  state: IState = { status: T(LANG.locate.click) }
  /**
   * 定位
   */
  locate(): void {
    this.setState({
      status: T(LANG.locate.doing),
    })
    locate().then(result => {
      let status = '';
      if (result.type === 'success') {
        status = T(LANG.locate.success);
        const { node, handler } = this.props;
        handler.handleAutoLocate(result.data, node);
      } else if (result.type === 'failure') {
        status = T(LANG.locate.failed);
      } else {
        status = T(LANG.locate.timeout)
      }
      this.setState({ status })
    })
  }
  render(): JSX.Element {
    const { node, theme } = this.props;
    return <div>
      {/* 调用共通组建渲染头部 */}
      <NodeHead node={node} theme={theme} />
      {/* 主区域 */}
      <NodeBody theme={theme}>
        {/* 定位按钮 */}
        <button onClick={() => this.locate()}>
          {this.state.status}
        </button>
        {/* 显示定位结果 */}
        <div>{node.value}</div>
      </NodeBody>
      {/* 定位题的选项和其他选项时不需要渲染的 */}
    </div>
  }
}

export default LocationBasic;