import React from 'react';
import Button from '../Button/Button';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

type Props = {
  currentPage: number;
  totalPages: number;
  className?: string;
};
export default function Pagination({
  currentPage,
  totalPages,
  className,
}: Props): React.ReactElement {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const handlePageTurn = (pageStep: -1 | 1) => () => {
    const newPage = currentPage + pageStep;

    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(newPage));

    const currentPathname = location.pathname;
    navigate(`${currentPathname}?${newParams.toString()}`);
  };

  return (
    <div className={`flex gap-4 ${className ?? ''} text-xl`}>
      <Button onClick={handlePageTurn(-1)} disabled={currentPage === 1}>
        Prev
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button onClick={handlePageTurn(1)} disabled={currentPage === totalPages}>
        Next
      </Button>
    </div>
  );
}
