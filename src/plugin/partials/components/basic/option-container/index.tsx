import React from 'react';

class OptionContainer extends React.Component {
  render(): JSX.Element {
    return <div className='option-container'>
      {this.props.children}
    </div>
  }
}

export default OptionContainer;