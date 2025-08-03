import { EMPTY_RESULT_MESSAGES } from './messages';

export default function EmptySearchResult() {
  return (
    <div className="messageContainer" data-testid="empty-search-result">
      <h3 className="font-bold">{EMPTY_RESULT_MESSAGES.DEFAULT}</h3>
    </div>
  );
}
