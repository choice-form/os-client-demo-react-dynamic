import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Util } from '@choiceform/os-client-core'
interface IProps extends RouteComponentProps {
  core: CFCore;
}

interface IState {
  model: CFIntro;
}

class Main extends React.Component<IProps, IState> {
  /**
   * 是否已经进行了首次渲染
   */
  private initialized: boolean;
  constructor(props: IProps) {
    super(props);
    this.state = { model: null }
    console.log('index construction')
    const oldSetter = this.setState;
    this.setState = (data: any) => {
      console.log('index set state');
      oldSetter.call(this, data);
    }
    this.init();
  }
  /**
   * 去往答题页面
   */
  private async gotoQuestions(): Promise<void> {
    // 去之前先拿帮答题页拿好数据,同时显示loading状态
    // 这样可以避免答题页面临时拿数据出现空白
    // 请求成功的数据释放到缓存里的,到答答题页面再次请求该数据时
    // 不会再次发送远程请求,而是或获取到缓存里面的数据
    await this.props.core.fetchQuestions()
    const url = Util.getQuestionsPageUrl('questions')
      .replace(location.origin, '.');
    this.props.history.replace(url)
  }
  /**
   * 初始化数据
   */
  private async init(): Promise<void> {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    const model = await this.props.core.fetchIntro();
    model.setNextHander(() => {
      this.gotoQuestions();
    });
    this.setState({ model });
  }
  /**
   * 渲染页面
   */
  render(): JSX.Element {
    console.log('index render');
    const { model } = this.state;
    if (!model) {
      return null
    }
    // 自动跳过首页开始答题的情况下
    if (model.startAuto && !model.nextLoading) {
      this.gotoQuestions();
      return null;
    }
    // 交给动态模板渲染,开始页面和节点不同,直接传入整个model
    const StartComponent = model.template.component;
    return <div>
      <StartComponent model={model} />
    </div>
  }
}

export default Main;