import { Component } from 'react';
import { LOADER_MESSAGES } from './messages';

export default class Loader extends Component {
  render() {
    return (
      <div className="messageContainer gap-4" data-testid="loader">
        <div className="w-6 h-6 border-4 border-t-transparent rounded-full animate-spin" />
        <span className="text-lg">{LOADER_MESSAGES.DEFAULT}</span>
      </div>
    );
  }
}
