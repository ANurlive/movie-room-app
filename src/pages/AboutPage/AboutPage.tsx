import { ABOUT_PAGE_MESSAGES } from './messages';

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-full text-center p-4">
      <h3 className="text-2xl">{ABOUT_PAGE_MESSAGES.AUTHOR_TEXT}</h3>
      <a
        href={ABOUT_PAGE_MESSAGES.LINK}
        target="_blank"
        className="text-blue-600 underline hover:text-blue-800 text-2xl"
        rel="noreferrer"
      >
        Visit RS School React Course
      </a>
    </div>
  );
}
