import { Component } from 'react';

export enum ButtonType {
  Button = 'button',
  Submit = 'submit',
}
type ButtonProps = {
  text: string;
  type: ButtonType;
  className?: string;
  handleClick?: (event: React.MouseEvent) => void;
};

export default class Button extends Component<ButtonProps> {
  render() {
    const { text, type, className, handleClick } = this.props;
    return (
      <button
        type={type}
        className={`border border-white rounded-2xl px-3 hover:bg-gray-400 transition duration-300 ${className}`}
        onClick={handleClick}
      >
        {text}
      </button>
    );
  }
}
