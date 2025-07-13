import { Component } from 'react';
import { LOADER_MESSAGES } from './messages';

export default class Loader extends Component {
  render() {
    return (
      <div className="messageContainer">
        <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" />
        <span className="text-lg">{LOADER_MESSAGES.DEFAULT}</span>
      </div>
    );
  }
}
