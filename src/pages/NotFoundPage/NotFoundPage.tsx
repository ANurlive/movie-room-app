import ErrorMessage from '../../components/ErrorMessage';

export default function NotFoundPage() {
  return <ErrorMessage errorCode={404} />;
}
