import React from "react";
import QrCodeBasic from "../../../partials/components/basic/qr-code";

interface IProps extends IQuesComBaseProps {
  node: CFLotteryPage;
}

/**
 * 基础风格的抽奖页面组件
 */
class LotteryBasic extends React.Component<IProps> {
  render(): JSX.Element {
    const { node } = this.props;
    return (
      <div className="lottery-basic">
        {/* 有抽奖结构图片则需要渲染 */}
        {node.rewardImage ? (
          <img
            src={node.rewardImage.url}
            className="max-w-full mb-2 ot:max-w-sm"
            title={node.rewardImage.originName}
          />
        ) : null}
        {/* 抽奖结果标题 */}
        <h4>{node.rewardTitle}</h4>
        {/* 抽奖结果描述 */}
        <p>{node.rewardDescribe}</p>
        {/* 抽中的奖项名称 */}
        <p>{node.rewardName}</p>
        {/* 抽奖时间 */}
        <div className="text-xs text-gray-600">{node.rewardTime}</div>
        {/* 如果需要显示经历信息详情,则渲染所有的奖项内容 */}
        {node.showRewards && (
          <ul>
            {node.rewardList.map(item => {
              return (
                <li key={item.rewardName}>
                  <span>{item.rewardName}</span>
                  <span>{item.rewardNumbering}</span>
                </li>
              );
            })}
          </ul>
        )}
        {/* 如果有二维码文字,则显示二维码   */}
        {node.qrCode && <QrCodeBasic text={node.qrCode} />}
      </div>
    );
  }
}

export default LotteryBasic;
