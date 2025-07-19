import { Component, type ReactNode } from 'react';
import { LAYOUT_TEXT } from './messages';

type LayoutProps = {
  children: ReactNode;
};

export default class Layout extends Component<LayoutProps> {
  render() {
    return (
      <div className="flex flex-col gap-8 w-full min-h-screen">
        <header className="flex justify-center items-center h-[80px]">
          <h1 className="text-4xl font-extrabold uppercase text-red-600">
            {LAYOUT_TEXT.TITLE}
          </h1>
        </header>
        <main className="flex flex-col gap-6 w-full flex-1 px-8">
          {this.props.children}
        </main>
        <footer className="text-xs text-center text-gray-400 h-12">
          {LAYOUT_TEXT.FOOTER}
        </footer>
      </div>
    );
  }
}
