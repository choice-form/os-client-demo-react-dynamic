import React from "react";
import { T, LANG } from "../../../../utils/i18n";
import QrCodeBasic from "../../../partials/components/basic/qr-code";

interface IProps {
  model: CFRewardState;
}

class RewardBasic extends React.Component<IProps> {
  render(): JSX.Element {
    const { model } = this.props;
    return (
      <div className="reward-basic">
        <h4>{model.rewardName}</h4>
        <p>{model.title}</p>
        {model.rewardType === "wechat" ? (
          <div>
            <div
              className="flex-shrink-0 w-8 h-8 mr-2 bg-center bg-cover rounded-full"
              style={{
                backgroundImage: (("url(" + model.wechatImage) as string) + ")",
              }}
            ></div>
            <div className="text-sm">{model.wechatID}</div>
            <span className="text-xs text-gray-600">
              {T(LANG.reward.wechat)}
            </span>
            <p>{model.rewardValue}</p>
          </div>
        ) : (
          <div className="mt-4">
            <div className="text-sm text-center text-gray-600 ot:text-left">
              {T(LANG.reward.custom)}
            </div>
            <QrCodeBasic text={model.qrCode} />
            <div className="flex items-center w-full ot:max-w-sm">
              <input
                className={
                  "relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border rounded-md appearance-none " +
                  "focus:outline-none focus:shadow-outline focus:border-blue-300 focus:z-10 " +
                  "text-sm leading-5 "
                }
                type="text"
                value={model.phoneNumber}
                placeholder={T(LANG.verification.inputPhone)}
                onChange={(e) => {
                  model.handleEvents.handleInputPhone(
                    e.target.value,
                    model as any
                  );
                }}
              />
              <button className="flex items-center flex-shrink-0 px-4 py-2 ml-2 text-sm font-medium leading-5 text-gray-700 truncate bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline focus:border-blue-300 active:text-gray-800 active:bg-gray-50">
                {T(LANG.verification.getMessage)}
              </button>
            </div>
          </div>
        )}
        {model.prevButton ? (
          <button
            className="inline-flex items-center justify-center px-5 py-3 mr-4 text-base font-medium leading-6 text-indigo-600 bg-white bg-indigo-100 border border-transparent rounded-md hover:text-indigo-500 focus:outline-none focus:shadow-outline"
            onClick={() => model.handleEvents.handlePrevClick()}
          >
            {model.prevButton}
          </button>
        ) : null}
        {model.nextButton ? (
          <button
            className="inline-flex items-center justify-center px-5 py-3 my-6 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:shadow-outline"
            onClick={() => model.handleEvents.handleNextClick()}
          >
            {model.nextButton}
          </button>
        ) : null}
      </div>
    );
  }
}

export default RewardBasic;
