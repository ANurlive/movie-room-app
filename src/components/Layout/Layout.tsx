import Details from '../../pages/Details';
import { LAYOUT_TEXT } from './messages';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  // const state = location.state as { backgroundLocation?: Location };
  // const backgroundLocation = state?.backgroundLocation;

  const isDetailsOpen = /^\/\d+$/.test(location.pathname);

  return (
    <div className="flex flex-col gap-8 w-full min-h-screen">
      <header className="flex flex-col gap-6 justify-center items-center ">
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
      </header>
      <main className="flex gap-6 w-full flex-1 px-8">
        <div className={`${isDetailsOpen ? 'w-1/2' : 'w-full'}`}>
          <Outlet />{' '}
          {/* вот тут хотела сохранить состояние прежней страницы, чтобы он не перезапускался*/}
        </div>
        {isDetailsOpen && (
          <div className="w-1/2">
            <Details />{' '}
            {/*  сейчас это не будет работать так как мне нужно аутлет передать*/}
          </div>
        )}
      </main>
      <footer className="text-xs text-center text-gray-400 h-12">
        {LAYOUT_TEXT.FOOTER}
      </footer>
    </div>
  );
}
