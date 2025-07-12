import { Component } from 'react';

type ErrorMessageProps = {
  text: string;
};
export default class ErrorMessage extends Component<ErrorMessageProps> {
  render() {
    return (
      <div className="messageContainer">
        <h3 className="text-bold text-red-600">{this.props.text}</h3>
      </div>
    );
  }
}
