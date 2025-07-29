import React from 'react';
import Button from '../Button/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';

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

  const handlePageTurn = (direction: 'prev' | 'next') => {
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(newPage));
    navigate(`/?${newParams.toString()}`);
  };

  return (
    <div className={`flex gap-4 ${className ?? ''}`}>
      <Button
        onClick={() => handlePageTurn('prev')}
        disabled={currentPage === 1}
      >
        Prev
      </Button>

      <Button
        onClick={() => handlePageTurn('next')}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
