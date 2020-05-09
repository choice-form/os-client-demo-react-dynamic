import React from 'react';

interface IProps {
  message: string;
  placeholder: string
  value: string | number;
  handleChange(value: string): void;
}

class OptionInput extends React.Component<IProps> {
  render(): JSX.Element {
    const { value, message, handleChange, placeholder } = this.props;
    return <div>
      <input type="text" value={value}
      placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)} />
      {message
        ? <div className='option-error'>{message}</div>
        : null}
    </div>
  }
}

export default OptionInput;