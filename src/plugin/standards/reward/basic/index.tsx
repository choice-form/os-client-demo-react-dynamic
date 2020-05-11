import React from 'react';
import { T } from '../../../../utils/i18n';

interface IProps {
  model: CFRewardModel;
}

class RewardBasic extends React.Component<IProps> {
  render(): JSX.Element {
    const { model } = this.props;
    return <div className='reward-basic'>
      <h1>{model.rewardName}</h1>
      <p>{model.title}</p>
      {model.rewardType === 'wechat'
        ? <div>
          <h2>{T(LANG.reward.wechat)}</h2>
          <p>{model.rewardValue}</p>
        </div>
        : <div>
          <p>{T(LANG.reward.custom)}</p>
          <p>{model.qrCode}</p>
          <input type="text" value={model.phoneNumber}
            onChange={(e) => {
              model.handleEvents.handleInputPhone(e.target.value, model as any)
            }} />
          <button>{T(LANG.verification.getMessage)}</button>
        </div>}
    </div>
  }
}

export default RewardBasic;