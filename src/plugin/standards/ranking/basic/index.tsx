import React from "react";
import NodeHead from "../../../partials/components/basic/node-head";
import NodeBody from "../../../partials/components/basic/node-body";
import OtherOptions from "../../../partials/components/basic/other-options";

interface IProps extends IQuesComBaseProps {
  node: CFRankingQuestion;
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
  handleDragStart(index: number): void {
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
    target.classList.add("bg-gray-200");
    // 赶紧记下索引
    this.dropIndex = index;
  }
  /**
   * 拖拽离开时处理方法
   * @param index
   */
  handleDragLeave(e: React.DragEvent<HTMLElement>): void {
    const target = e.target as HTMLElement;
    target.classList.remove("bg-gray-200");
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
    handler.handleOptionDrop(this.dragStartIndex, this.dropIndex, node);
  }
  /**
   * 给目标添加一个样式
   */
  render(): JSX.Element {
    const { node, handler, theme } = this.props;
    return (
      <div className="basic-ranking">
        {/* 使用共同组建渲染头部 */}
        <NodeHead node={node} theme={theme} />
        {/* 渲染常规选项 */}
        <NodeBody theme={theme}>
          <div
            className="w-full"
            onDrop={() => this.handleDrop()}
            onDragOver={(e) => e.preventDefault()}
          >
            {/* 我们这里使用拖拽的方式进行排序 */}
            {node.options.map((option, index) => {
              return (
                <div
                  key={option.renderId}
                  className="rounded-md shadow-sm"
                  onDragEnter={(e) => this.handleDragEnter(index, e)}
                  onDragLeave={(e) => this.handleDragLeave(e)}
                  onDragStart={() => this.handleDragStart(index)}
                  draggable={true}
                >
                  <div
                    className={
                      "select-none " +
                      "flex items-center px-4 py-2 mt-2 text-sm leading-5 text-gray-700 bg-white border border-gray-300 rounded-md " +
                      "hover:text-gray-500 active:text-gray-800 active:bg-gray-50 " +
                      "focus:outline-none focus:shadow-outline focus:border-blue-300 " +
                      (option.sortNo > 0 && "text-indigo-600")
                    }
                  >
                    {option.sortNo > 0 && (
                      <div className="mr-2 font-medium pointer-events-none">
                        {option.sortNo}
                      </div>
                    )}
                    <span
                      className="flex-grow pointer-events-none"
                      dangerouslySetInnerHTML={{ __html: option.text }}
                    ></span>
                    <svg
                      className="text-gray-600 pointer-events-none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <g fill="none" stroke="currentColor">
                        <line x1="8.5" y1="0.5" x2="8.5" y2="15.5"></line>
                        <polyline points="12.5,11.5 8.5,15.5 4.5,11.5 "></polyline>
                        <polyline points="12.5,4.5 8.5,0.5 4.5,4.5 "></polyline>
                      </g>
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </NodeBody>
        {/* 渲染其他选项,调用共通组建 */}
        <OtherOptions node={node} handler={handler} theme={theme} />
      </div>
    );
  }
}

export default RankingBasic;
