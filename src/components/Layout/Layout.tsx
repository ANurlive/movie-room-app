import ToggleThemeButton from '../ToggleThemeButton/ToggleThemeButton';
import { LAYOUT_TEXT } from './messages';
import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="my-4 flex min-h-screen w-full flex-col gap-8 px-8">
      <header className="flex justify-between">
        <div className="flex-col items-center justify-center gap-6">
          <h1 className="text-4xl font-extrabold uppercase text-red-600">
            {LAYOUT_TEXT.TITLE}
          </h1>
          <nav className="flex gap-6">
            <NavLink to="/" className="text-2xl">
              Home
            </NavLink>
            <NavLink to="/about" className="text-2xl">
              About
            </NavLink>
          </nav>
        </div>
        <ToggleThemeButton />
      </header>
      <main className="flex w-full flex-1 gap-6">
        <Outlet />
      </main>
      <footer className="h-12 text-center text-xs text-gray-400">
        {LAYOUT_TEXT.FOOTER}
      </footer>
    </div>
  );
}
