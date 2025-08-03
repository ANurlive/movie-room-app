import { useSelector } from 'react-redux';
import { getSelectedCards } from '../../store/selectedCards/selectors';
import { useDispatch } from 'react-redux';
import { unselectAll } from '../../store/selectedCards/reducer';
import { messages } from './messages';
import Button from '../Button';
import downloadCards from './utils/downloadCards';

export default function Flyout() {
  const cards = useSelector(getSelectedCards);
  const cardsList = Object.values({ ...cards });
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(unselectAll());
  };

  const handleDownload = () => {
    downloadCards(cardsList);
  };

  if (cardsList.length === 0) return null;
  return (
    <div className="z-999 bold fixed bottom-0 left-0 right-0 flex items-center justify-between border-t bg-white p-4 text-2xl text-black shadow-md">
      <span>{cardsList.length} item(s) selected</span>
      <div className="space-x-2">
        <Button
          onClick={handleClear}
          className="border-2 bg-transparent !text-black hover:!bg-gray-200"
        >
          {messages.UNSELECT_BUTTON}
        </Button>
        <Button
          onClick={handleDownload}
          className="border-2 bg-transparent !text-black hover:!bg-gray-200"
        >
          {messages.DOWNLOAD_BUTTON}
        </Button>
      </div>
    </div>
  );
}
