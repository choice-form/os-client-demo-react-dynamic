import React from 'react';
import NodeHead from '../../../partials/components/basic/node-head';
import { T, LANG } from '../../../../utils/i18n';
import NodeBody from '../../../partials/components/basic/node-body';

interface IProps extends IQuesComBaseProps {
  node: CFVerificationQuestion;
}

class VerificationBasic extends React.Component<IProps> {

  /**
   * 渲染
   */
  render(): JSX.Element {
    const { node, theme } = this.props;
    return <div className='basic-verification'>
      <NodeHead node={node} theme={theme} />
      <NodeBody theme={theme}>
        {this.renderBody()}
      </NodeBody>
    </div>
  }
  /**
   * 渲染主体
   */
  renderBody(): JSX.Element {
    const { verificationType } = this.props.node;
    // 验证码验证
    if (verificationType === 'captcha') {
      return this.renderCapture();
      // 密码验证
    } else if (verificationType === 'password') {
      return this.renderPassword();
      // 短信验证
    } else {
      this.renderMessage();
    }
  }

  /**
   * 渲染图像验证码验证
   */
  renderCapture(): JSX.Element {
    const { node, handler } = this.props;
    return <div>
      <div>{T(LANG.verification.inputCode)}</div>
      {/* 渲染验证码输入框,当用户看到图形验证码后,可以在这个输入框输入验证码
      输入发生变化后需要调用核心库提供的回调函数 */}
      <input type="text" value={node.code}
        onChange={(e) => handler.handleInputCode(e.target.value, node)} />
      {/* 渲染一个按钮,用户可以点击这个按钮获取验证码,点击后需要
        调用核心库提供的回调函数 */}
      <button onClick={() => handler.handleGetCodeClick(node)}>
        {T(LANG.verification.getCapture)}
      </button>
      {/* 渲染图像验证码,当用户点击获取图像验证码,调用了回调函数,
      之后从节点上可以取到该验证码的地址 */}
      <img src={node.captcha} />
    </div>
  }
  /**
   * 渲染手机短信验证
   */
  renderMessage(): JSX.Element {
    const { node, handler } = this.props;
    return <div>
      <div>{T(LANG.verification.inputPhone)}</div>
      {/* 渲染手机号码输入框, 输入变化后序号调用核心库提供的回调函数 */}
      <input type="text" value={node.phoneNumber}
        onChange={(e) => handler.handleInputPhone(e.target.value, node)} />
      <div>{T(LANG.verification.inputCode)}</div>
      {/* 渲染验证码输入框,当用户手机上接受到验证码,用户可以在这个输入框输入验证码
      输入发生变化后需要调用核心库提供的回调函数 */}
      <input type="text" value={node.code}
        onChange={(e) => handler.handleInputCode(e.target.value, node)} />
      {/* 渲染一个按钮,当用户输入手机号码后,可以点击这个按钮获取验证码,点击后需要
        调用核心库提供的回调函数 */}
      <button onClick={() => handler.handleGetCodeClick(node)}>
        {T(LANG.verification.getMessage)}
      </button>
    </div>
  }
  /**
   * 渲染密码验证
   */
  renderPassword(): JSX.Element {
    const { node, handler } = this.props;
    return <div>
      <div>{T(LANG.verification.inputPswd)}</div>
      <input type="text" value={node.code}
        onChange={(e) => handler.handleInputCode(e.target.value, node)} />
    </div>
  }
}

export default VerificationBasic;