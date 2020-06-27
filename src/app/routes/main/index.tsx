import React from "react";
import { RouteComponentProps } from "react-router-dom";
import LangList from "../../components/lang-list";
import { EventHub } from "@choiceform/os-client-core";
interface IProps extends RouteComponentProps {
  core: CFCore;
}

interface IState {
  model: CFStartState;
}

class Main extends React.Component<IProps, IState> {
  /**
   * 是否已经进行了首次渲染
   */
  private initialized: boolean;
  constructor(props: IProps) {
    super(props);
    this.state = { model: null };
    this.init();
  }
  /**
   * 初始化数据
   */
  private async init(): Promise<void> {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    const routerSwitcher = (p: CFRouteSwitchParam) => {
      setTimeout(() => {
        this.props.history.replace(p.route);
      });
    };
    const model = await this.props.core.fetchStartState(routerSwitcher);
    this.setState({ model });
    // 驱动一下上级更新一个标题
    EventHub.trigger('SET_PROPS');
  }
  /**
   * 渲染页面
   */
  render(): JSX.Element {
    const { model } = this.state;
    // 没有数据,或者数据中指定不要显示UI时不渲染
    if (!model || model.hidden) {
      return null;
    }
    // 交给动态模板渲染,开始页面和节点不同,直接传入整个model
    const StartComponent = model.template.component;
    return (
      <div className="container relative flex flex-col flex-grow p-4 mx-auto">
        <div className="flex items-center justify-end mb-4">
          <LangList
            handler={model.handleEvents}
            language={model.language}
            langTable={model.langTable}
          />
        </div>
        <div className="relative flex flex-col items-center justify-center flex-grow">
          <StartComponent model={model} />
        </div>
      </div>
    );
  }
}

export default Main;
