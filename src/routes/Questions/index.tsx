import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps {
  handleAdd: () => void
}

class Questions extends React.Component {
  props: IProps
  render() {
    console.log(this.props);
    return <div>
      question page
      <button onClick={() => {
        this.props.handleAdd();
      }}>Add</button>
      <button onClick={() => {
        this.props.history.replace('./index');
      }}>
        Jump to index
      </button>
    </div>
  }
}

export default Questions;