import { useEffect } from 'react';

type Props = {
  errorMessage: string;
};

export default function BrokenComponent({ errorMessage }: Props) {
  useEffect(() => {
    throw new Error(errorMessage);
  }, [errorMessage]);
  return null;
}
