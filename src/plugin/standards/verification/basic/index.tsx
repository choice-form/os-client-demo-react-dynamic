import React from 'react';
import NodeHead from '../../../partials/components/basic/node-head';
import { Enum } from '@choiceform/os-client-core'
import { T } from '../../../../utils/i18n';

interface IProps extends IQuesComBaseProps {
  node: CFValidateQuestion;
}

class VerificationBasic extends React.Component<IProps> {


  render(): JSX.Element {
    const { node, theme } = this.props;
    return <div className='basic-verification'>
      <NodeHead node={node} theme={theme} />
      {node.validateType === Enum.VALIDATE_TYPE.PASSWORD
        ? this.renderPassword()
        : node.validateType === Enum.VALIDATE_TYPE.VERIFY_CODE
          ? this.renderCapture()
          : this.renderMessage()}
    </div>
  }

  /**
   * 渲染图像验证码验证
   */
  renderCapture(): JSX.Element {
    const { node, handler } = this.props;
    return <div>
      <div>{T(LANG.verification.inputCode)}</div>
      <input type="text" value={node.code}
        onChange={(e) => handler.handleInputCode(e.target.value, node)} />
      <button onClick={() => handler.handleGetCodeClick(node)}>
        {T(LANG.verification.getCapture)}
      </button>
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
      <input type="text" value={node.phoneNumber}
        onChange={(e) => handler.handleInputPhone(e.target.value, node)} />
      <div>{T(LANG.verification.inputCode)}</div>
      <input type="text" value={node.code}
        onChange={(e) => handler.handleInputCode(e.target.value, node)} />
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