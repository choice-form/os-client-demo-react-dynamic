import React from "react";
import NodeHead from "../../../partials/components/basic/node-head";
import OptionContainer from "../../../partials/components/basic/option-container";
import OtherOptions from "../../../partials/components/basic/other-options";

interface IProps extends IQuesComBaseProps {
  node: CFGraphMarkQuestion;
}

class RatingBasic extends React.Component<IProps> {
  private iconListCache: { [key: number]: string[] } = [];
  /**
   * 获取图标列表
   * @param opt
   */
  private getIconList(opt: CFGraphMarkOption): string[] {
    const { count, icon } = opt;
    let result = this.iconListCache[count];
    if (!result) {
      const numberList = Array.from(Array(10).keys());
      result = numberList.map(() => icon);
      this.iconListCache[count] = result;
    }
    return result;
  }
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const { node, handler, theme } = this.props;
    return <div className='basic-rating'>
      <NodeHead node={node} theme={theme} />
      <OptionContainer>
        {node.options.map(opt => {
          const iconList = this.getIconList(opt);
          return < div key={opt.renderId} >
            <span>{opt.text}</span>
            <div className='rate-icon-list'>
              {iconList.map((_icon, index) => {
                return <span key={index}
                  className={(opt.value > index) ? 'active' : ''}
                  onClick={() => handler.handleOptionInput(index + 1, opt, node)}>
                </span>
              })}
              <span>{opt.value || 0}</span>
            </div>
          </div>
        })
        }
      </OptionContainer>
      <OtherOptions node={node} handler={handler} theme={theme} />
    </div >
  }
}

export default RatingBasic;