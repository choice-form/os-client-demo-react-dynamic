import React from "react";
import { ReactSVG } from "react-svg";
import classnames from "classnames";
type Props = {
  icon: string;
  className?: ClassNamesType;
  style?: any;
} & Partial<typeof defaultProps>;

const defaultProps = {
  size: "16px",
};

class Icon extends React.PureComponent<Props, {}> {
  static defaultProps = defaultProps;
  get classStr() {
    const list = [
      "Icon pointer-events-none flex-shrink-0",
      this.props.className,
    ];
    return classnames(list);
  }

  render() {
    const style = {
      width: this.props.size,
      height: this.props.size,
    };
    return (
      <div className={this.classStr} style={this.props.style}>
        <ReactSVG
          style={style}
          src={`public/assets/svg/${this.props.icon}.svg`}
          className={"fill-current"}
        />
      </div>
    );
  }
}

export default Icon;
