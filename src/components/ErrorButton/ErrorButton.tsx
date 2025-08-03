import { useEffect, useState } from 'react';
import { ERROR_BUTTON_MESSAGES } from './messages';
import Button from '../Button';

type Props = {
  className?: string;
};
export default function ErrorButton({ className }: Props) {
  const [isBroken, setIsBroken] = useState<boolean>(false);

  const handleClick = () => {
    setIsBroken(true);
  };

  useEffect(() => {
    if (isBroken) throw new Error(ERROR_BUTTON_MESSAGES.DEFAULT_MESSAGES);
  }, [isBroken]);

  return (
    <Button
      onClick={handleClick}
      data-action="throw-error"
      className={className}
      data-testid="error-button"
    >
      {ERROR_BUTTON_MESSAGES.BUTTON_NAME}
    </Button>
  );
}
