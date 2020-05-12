import React from 'react';
import NodeHead from '../../../partials/components/basic/node-head';
import OptionContainer from '../../../partials/components/basic/option-container';
import OtherOptions from '../../../partials/components/basic/other-options';

interface IProps extends IQuesComBaseProps {
  node: CFSequenceQuestion;
}

/**
 * 排序题基础渲染组件
 * 1.渲染头部,大部分题目的头部规则都是一样的,调用共通组件渲染即可,如果
 * 你想让某些题目的头部不一样,则另行实现即可.
 *
 * 2.渲染常规选项:常规选项在UI渲染好后应该可以让答题纸操作进行排序
 * 比如拖拽进行排序,或者在每个选项上填写序号进行排,具体让用户用什么操作进行排序
 * 由UI自己决定,你也可以使用第三方拖拽插件实现但是不管你用什么UI方式的排序,每次UI上排序发生变化时,
 * 必须回调核心中提供的对应回调函数通知核心
 *
 * 3.渲染其他选项,大部分题目的其他选项规则都是一样的,调用共通组件渲染即可,如果
 * 你想让某些题目的其他选项不一样,则另行实现即可.
 *
 */
class RankingBasic extends React.Component<IProps> {
  /**
   * 该组件专用的样式
   */
  static style: string = require('./style.scss')
  /**
   * 拖拽开始时的索引,后面调用核心回调函数时要用到
   */
  dragStartIndex: number;
  /**
   * 拖拽释放时的索引
   */
  dropIndex: number;
  /**
   * 开始拖拽时的处理方法
   * @param index 所在索引
   */
  handldDragStart(index: number): void {
    // 赶紧记下索引
    this.dragStartIndex = this.dropIndex = index;
  }
  /**
   * 拖拽进入时处理方法
   * @param index
   */
  handleDragEnter(index: number, e: React.DragEvent<HTMLElement>): void {
    const target = e.target as HTMLElement;
    // 给目标添加一个样式
    target.classList.add('drop-target');
    // 赶紧记下索引
    this.dropIndex = index;
  }
  /**
   * 拖拽离开时处理方法
   * @param index
   */
  handleDragLeave(e: React.DragEvent<HTMLElement>): void {
    const target = e.target as HTMLElement;
    target.classList.remove('drop-target');
  }
  /**
   * 释放拖拽时的处理方法
   */
  handleDrop(): void {
    if (this.dragStartIndex === this.dropIndex) {
      return;
    }
    const { node, handler } = this.props;
    // 发生位置变化时,调用核心回调
    handler.handleOptionDrop(
      this.dragStartIndex, this.dropIndex, node
    )
  }
  /**
   * 给目标添加一个样式
   */
  render(): JSX.Element {
    const { node, handler, theme } = this.props;
    return <div className='basic-ranking'>
      {/* 使用共同组建渲染头部 */}
      <NodeHead node={node} theme={theme} />
      {/* 渲染常规选项 */}
      <OptionContainer  theme={theme}>
        <div onDrop={() => this.handleDrop()}
          onDragOver={(e) => e.preventDefault()}>
          {/* 我们这里使用拖拽的方式进行排序 */}
          {node.options.map((option, index) => {
            return <div key={option.renderId}
              className='drag-item'
              onDragEnter={(e) => this.handleDragEnter(index, e)}
              onDragLeave={(e) => this.handleDragLeave(e)}
              onDragStart={() => this.handldDragStart(index)}
              draggable={true} >
              <span>{option.sortNo > 0 ? option.sortNo + '-' : ''}</span>
              <span>{option.text}</span>
              <span>↕️</span>
            </div>
          })}
        </div>

      </OptionContainer>
      {/* 渲染其他选项,调用共通组建 */}
      <OtherOptions node={node} handler={handler} theme={theme} />
    </div>
  }
}

export default RankingBasic;