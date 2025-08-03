import { LOADER_MESSAGES } from './messages';

export default function Loader() {
  return (
    <div className="messageContainer gap-4" data-testid="loader">
      <div className="h-6 w-6 animate-spin rounded-full border-4 border-t-transparent" />
      <span className="text-lg">{LOADER_MESSAGES.DEFAULT}</span>
    </div>
  );
}
