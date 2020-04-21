import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps {
  model: CFState;
}

class Questions extends React.Component<IProps> {
  render(): JSX.Element {
    return <div>
      question page
    </div>
  }
}

export default Questions;