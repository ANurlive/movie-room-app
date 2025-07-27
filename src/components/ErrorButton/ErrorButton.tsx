import { useEffect, useState } from 'react';
import { ERROR_BUTTON_MESSAGES } from './messages';
import Button from '../Button';

export default function ErrorButton() {
  const [isBroken, setIsBroken] = useState<boolean>(false);

  const handleClick = () => {
    setIsBroken(true);
  };

  useEffect(() => {
    if (isBroken) throw new Error(ERROR_BUTTON_MESSAGES.DEFAULT_MESSAGES);
  }, [isBroken]);

  return (
    <Button onClick={handleClick} data-action="throw-error">
      {ERROR_BUTTON_MESSAGES.BUTTON_NAME}
    </Button>
  );
}
