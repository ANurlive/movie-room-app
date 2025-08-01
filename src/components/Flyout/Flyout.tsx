import { useSelector } from 'react-redux';
import { getSelectedCards } from '../../store/selectedCards/selectors';
import { useDispatch } from 'react-redux';
import { unselectAll } from '../../store/selectedCards/reducer';
import { saveAs } from 'file-saver';
import { messages } from './messages';
import Button from '../Button';

export default function Flyout() {
  const cards = useSelector(getSelectedCards); //it's an object like { id: {id:..., title: ...}, id: ...}
  const cardsList = Object.values({ ...cards });
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    const csvRows = [
      ['Title', 'Overview', 'Release date'],
      cardsList.map((card) => [card.title, card.overview, card.releaseDate]),
    ];
    const csvContent = csvRows
      .map((row) => row.map((val) => `"${val}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `selected_movies.csv`);
  };

  if (cardsList.length === 0) return null;
  return (
    <div className="fixed z-999 bottom-0 left-0 right-0 bg-white text-black text-2xl bold p-4 shadow-md border-t flex justify-between items-center">
      <span>{cardsList.length} item(s) selected</span>
      <div className="space-x-2">
        <Button onClick={handleClear}>{messages.UNSELECT_BUTTON}</Button>
        <Button onClick={handleDownload}>{messages.DOWNLOAD_BUTTON}</Button>
      </div>
    </div>
  );
}
