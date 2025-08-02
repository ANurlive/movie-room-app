import { RS_LINK } from '../../constants/links';
import { messages } from './messages';

export default function AboutPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-4 text-center">
      <h3 className="text-2xl">{messages.AUTHOR_TEXT}</h3>
      <a
        href={RS_LINK}
        target="_blank"
        className="text-2xl text-blue-600 underline hover:text-blue-800"
        rel="noreferrer"
      >
        {messages.LINK_TEXT}
      </a>
    </div>
  );
}
