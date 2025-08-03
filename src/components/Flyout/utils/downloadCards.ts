import type { MovieItem } from '../../../types/types';
import { saveAs } from 'file-saver';

export default function downloadCards(cardsList: MovieItem[]): void {
  const csvRows = [
    ['Title', 'Overview', 'Release date'],
    cardsList.map((card) => [card.title, card.overview, card.releaseDate]),
  ];
  const csvContent = csvRows
    .map((row) => row.map((val) => `"${val}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `selected_movies.csv`);
}
