import { Component } from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default class Button extends Component<Props> {
  render() {
    const { className, ...rest } = this.props;
    return (
      <button
        {...rest}
        className={`border border-white rounded-2xl px-3 hover:bg-gray-400 transition duration-300 ${className}`}
      ></button>
    );
  }
}
