import React from 'react';

interface IProps {
  handler: CFUIEventHandler;
  node: CFWeightQuestion;
}

class WeightBasic extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const { node, handler } = this.props;
    return <div>
      <span>WeightBasic</span>
      {node.images.map(image => {
        return <img src={image.large}
          key={image.id}
          title={image.originName}
        ></img>
      })}
      <h1>{node.title}</h1>
      <p>{node.description}</p>
      <div>{node.typeName}</div>
      <div style={{
        height: '30px',
        margin: '5px',
      }}>
        {node.options.map(opt => {
          const ratio = Number(opt.value) * 100 / node.weightTotal + '%';
          return <span style={{
            display: 'inline-block',
            width: ratio,
            height: '30px',
            background: opt.color,
          }} key={opt.renderId}></span>
        })}
      </div>
      {node.options.map(opt => {
        return <div key={opt.renderId}>
          <span style={{
            backgroundColor: opt.color,
            display: 'inline-block',
            width: '30px',
            height: '30px',
          }}></span>
          <span>{opt.text}</span>
          <input type="range"
            min='0'
            max={opt.maxValue}
            step='1'
            value={opt.value}
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value;
              handler.handleOptionInput(value, opt, node);
            }} />
          <span>{opt.value || 0}</span>
        </div>
      })
      }
    </div >
  }
}

export default WeightBasic;