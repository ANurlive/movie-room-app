import { Component, type ReactNode } from 'react';
import { LAYOUT_TEXT } from './messages';

type LayoutProps = {
  children: ReactNode;
};

export default class Layout extends Component<LayoutProps> {
  render() {
    return (
      <div className="flex flex-col w-full min-h-screen">
        <header className="flex justify-center items-center h-[100px]">
          <h1 className="text-3xl font-extrabold uppercase text-red-600 drop-shadow-md tracking-wide ">
            {LAYOUT_TEXT.TITLE}
          </h1>
        </header>
        <main className="w-full flex-1 px-8">{this.props.children}</main>
        <footer className="">{LAYOUT_TEXT.FOOTER}</footer>
      </div>
    );
  }
}
