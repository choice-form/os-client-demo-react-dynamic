import React from 'react';
import NodeHead from '../../../partials/components/basic/node-head';
import OptionContainer from '../../../partials/components/basic/option-container';
import OtherOptions from '../../../partials/components/basic/other-options';
import { T } from '../../../../utils/i18n';
import OptionIcon from '../../../partials/components/basic/option-icon';

interface IProps extends IQuesComBaseProps {
  node: CFSlideRateQuestion;
}
interface IState {
  index: number;
}

class SlideRateBasic extends React.Component<IProps, IState> {
  state: IState = { index: 0 };
  next(): void {
    this.setState({
      index: this.state.index + 1
    })
  }
  prev(): void {
    this.setState({
      index: this.state.index - 1
    })
  }
  render(): JSX.Element {
    const { node, theme, handler } = this.props;
    const option = node.options[this.state.index];
    return <div className='basic-slide-rate'>
      <NodeHead node={node} theme={theme} />
      <button onClick={() => this.prev()}
        disabled={this.state.index === 0}>
        {T(LANG.slideRate.prev)}
      </button>
      <button onClick={() => this.next()}
        disabled={this.state.index === node.options.length - 1}>
        {T(LANG.slideRate.next)}
      </button>
      <OptionContainer>
        <div>
          <img src={option.image.thumbnail} />
          <span>{option.text}</span>
          {node.rateOptions.map((rate, index) => {
            const rateId = "rate-" + index;
            return <div key={index}
              onClick={() => handler.handleOptionInput(rate.value, option, node)}>
              <label htmlFor={rateId}>
                <input type="radio" id={rateId}
                  onChange={() => {/** 保留这个空回调来组织React报错 */ }}
                  checked={option.value === rate.value} />
                {rate.url
                  ? <OptionIcon iconUrl={rate.url}
                    activated={option.value === rate.value}
                    cacheId={option.renderId + rateId}
                    iconActiveUrl={rate.urlActive} />
                  : null}
                <span>{rate.text}</span>
              </label>
            </div>
          })}
        </div>
      </OptionContainer>
      <OtherOptions node={node} theme={theme} handler={handler} />
    </div>
  }
}

export default SlideRateBasic;