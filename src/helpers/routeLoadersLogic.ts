import type { URL } from 'url';

const routeLoadersLogic = {
  revalidate: ({ currentUrl, nextUrl }: { currentUrl: URL; nextUrl: URL }) => {
    // const isNavigatingToDetails = nextUrl.pathname.match(/^\/\d+/);
    const searchChanged = currentUrl.search !== nextUrl.search;

    return searchChanged;
  },
};

export default routeLoadersLogic;
