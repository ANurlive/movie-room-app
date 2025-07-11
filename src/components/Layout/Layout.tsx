import { Component, type ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default class Layout extends Component<LayoutProps> {
  render() {
    return (
      <div className="flex flex-col w-full min-h-screen">
        <header className="flex justify-center items-center h-[100px]">
          <h1 className="text-2xl uppercase">Movie room</h1>
        </header>
        <main className="w-full flex-1 px-8">{this.props.children}</main>
        <footer className="visually-hidden">Footer</footer>
      </div>
    );
  }
}
