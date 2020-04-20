import React from 'react';


class Questions extends React.Component {
  props: {
    handleAdd: () => void,
    handleJump: (url: string) => void,
  }
  render() {
    console.log(this.props);
    return <div>
      question page
      <button onClick={() => {
        this.props.handleAdd();
      }}>Add</button>
      <button onClick={() => {
        this.props
      }}>
        Jump to index
      </button>
    </div>
  }
}

export default Questions;