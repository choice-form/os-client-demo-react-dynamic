import React from "react";
import NodeHead from "../../../partials/components/basic/node-head";
import NodeBody from "../../../partials/components/basic/node-body";
import OtherOptions from "../../../partials/components/basic/other-options";

interface IProps extends IQuesComBaseProps {
  node: CFRatingQuestion;
}

class RatingBasic extends React.Component<IProps> {
  private iconListCache: { [key: number]: string[] } = [];
  /**
   * 获取图标列表
   * @param opt
   */
  private getIconList(opt: CFRatingOption): string[] {
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
      <NodeBody theme={theme}>
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
      </NodeBody>
      <OtherOptions node={node} handler={handler} theme={theme} />
    </div >
  }
}

export default RatingBasic;