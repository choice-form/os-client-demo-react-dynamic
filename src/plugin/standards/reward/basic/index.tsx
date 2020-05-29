import React from 'react';
import { T, LANG } from '../../../../utils/i18n';
import QrCodeBasic from '../../../partials/components/basic/qr-code';

interface IProps {
  model: CFRewardState;
}

class RewardBasic extends React.Component<IProps> {
  render(): JSX.Element {
    const { model } = this.props;
    return <div className='reward-basic'>
      <h1>{model.rewardName}</h1>
      <p>{model.title}</p>
      {model.rewardType === 'wechat'
        ? <div>
          <img src={model.wechatImage} />
          <h2>{model.wechatID}</h2>
          <h2>{T(LANG.reward.wechat)}</h2>
          <p>{model.rewardValue}</p>
        </div>
        : <div>
          <p>{T(LANG.reward.custom)}</p>
          <QrCodeBasic text={model.qrCode} />
          <input type="text" value={model.phoneNumber}
            placeholder={T(LANG.verification.inputPhone)}
            onChange={(e) => {
              model.handleEvents.handleInputPhone(e.target.value, model as any)
            }} />
          <button>{T(LANG.verification.getMessage)}</button>
        </div>
      }
      {model.prevButton
        ? <button onClick={() => model.handleEvents.handlePrevClick()}>
          {model.prevButton}
        </button>
        : null
      }
      {model.nextButton
        ? <button onClick={() => model.handleEvents.handleNextClick()}>
          {model.nextButton}
        </button>
        : null
      }
    </div>
  }
}

export default RewardBasic;