import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps {
  model: CFIntro;
  requestModel(): void;
}

class Main extends React.Component<IProps> {
  private initialized: boolean;
  render(): JSX.Element {
    if (!this.initialized) {
      this.initialized = true;
      this.props.requestModel();
    }
    if (!this.props.model) {
      return <div>Loading Main...</div>
    }
    return <div>
      index page
    </div>
  }
}

export default Main;