import { RS_LINK } from '../../constants/links';
import { messages } from './messages';

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-full text-center p-4">
      <h3 className="text-2xl">{messages.AUTHOR_TEXT}</h3>
      <a
        href={RS_LINK}
        target="_blank"
        className="text-blue-600 underline hover:text-blue-800 text-2xl"
        rel="noreferrer"
      >
        {messages.LINK_TEXT}
      </a>
    </div>
  );
}
