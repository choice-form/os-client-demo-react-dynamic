import React from 'react';


class Option extends React.Component<IOptionBaseProps> {
  render(): JSX.Element {
    const { option } = this.props;
    return <div>
      <span>{option.text}</span>
    </div>
  }
}

export default Option;