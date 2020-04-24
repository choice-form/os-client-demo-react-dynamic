import React from "react";
import NodeHead from "../../../partials/node-head";

interface IProps {
  handler: CFUIEventHandler;
  node: CFMarkQuestion;
}

class RatingBasic extends React.Component<IProps> {
  private iconListCache: { [key: number]: string[] } = [];
  /**
   * 获取图标列表
   * @param opt
   */
  private getIconList(opt: CFMarkOption): string[] {
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
    const { node, handler } = this.props;
    return <div>
      <span>RatingBasic</span>
      <NodeHead node={node} />
      {node.options.map(opt => {
        const iconList = this.getIconList(opt);
        return < div key={opt.renderId} >
          <span>{opt.text}</span>
          <div style={{ display: 'inline-block' }}>
            {iconList.map((_icon, index) => {
              return <span key={index} style={{
                display: 'inline-block',
                width: '30px', height: '30px',
                border: 'solid 1px black',
                backgroundColor: (opt.value > index) ? 'orange' : undefined
              }} onClick={() => handler.handleOptionInput(index + 1, opt, node)}>
              </span>
            })}
            <span>{opt.value || 0}</span>
          </div>
        </div>
      })
      }
    </div >
  }
}

export default RatingBasic;