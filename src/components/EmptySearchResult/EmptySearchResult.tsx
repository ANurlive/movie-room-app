import { Component } from 'react';
import { EMPTY_RESULT_MESSAGES } from './messages';

export default class EmptySearchResult extends Component {
  render() {
    return (
      <div className="messageContainer" data-testid="empty-search-result">
        <h3 className="font-bold">{EMPTY_RESULT_MESSAGES.DEFAULT}</h3>
      </div>
    );
  }
}
