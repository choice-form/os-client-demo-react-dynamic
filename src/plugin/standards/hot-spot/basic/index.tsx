import React from 'react';
import NodeHead from '../../../partials/components/basic/node-head';
import NodeBody from '../../../partials/components/basic/node-body';
import OtherOptions from '../../../partials/components/basic/other-options';

interface IProps extends IQuesComBaseProps {
  node: CFHotSpotQuestion;
}

class HotSpotBasic extends React.Component<IProps> {
  render(): JSX.Element {
    const { node, handler, theme } = this.props;
    // 这里定一个死的宽度,真实场合应该是动态的.
    const width = 250;
    const ratio = width / node.mapImgWidth;
    const height = node.mapImgHeight * ratio + 100;
    return <div className='hot-spot-basic'>
      <NodeHead node={node} theme={theme} />
      <NodeBody theme={theme}>
        <div>
          <svg style={{ minHeight: height }}>
            <g transform={`scale(${ratio})`}>
              <image xlinkHref={node.mapImage.natural} />
              {node.options.map(option => {
                return <g transform={option.transform}
                  onClick={() => handler.handleOptionClick(option, node)}>
                  <path d={option.pathD}
                    fillOpacity='0.5'
                    fill={option.color}
                    strokeOpacity={option.selected ? '1' : '0.1'}
                    stroke={option.color}
                    strokeWidth='5'></path>
                </g>
              })}
            </g>
          </svg>
        </div>
      </NodeBody>
      <OtherOptions node={node} theme={theme} handler={handler} />
    </div>
  }
}

export default HotSpotBasic;