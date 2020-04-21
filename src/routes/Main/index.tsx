import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps {
  handleAdd: () => void
}

class Main extends React.Component {
  props: IProps
  render() {
    console.log(this.props);
    return <div>
      index page
      <button onClick={() => {
        this.props.handleAdd();
      }}>Add</button>
      <button onClick={() => {
        this.props.history.replace('./questions')
      }}>
        Jump to questions
      </button>
    </div>
  }
}

export default Main;