import { Component } from 'react';

type EmptyResultProps = {
  text: string;
};
export default class EmptyResult extends Component<EmptyResultProps> {
  render() {
    return (
      <div className="messageContainer">
        <h3 className="text-bold">{this.props.text}</h3>
      </div>
    );
  }
}
