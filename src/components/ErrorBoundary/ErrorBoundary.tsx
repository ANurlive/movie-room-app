import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';
import { ApiError } from '../../helpers/handleAPIErrors';
import { ERROR_BOUNDARY_MESSAGES } from './messages';
import Button from '../Button';

function FallbackUI() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6">
      <p>{ERROR_BOUNDARY_MESSAGES.DEFAULT_ERROR_MESSAGE}</p>
      <Button onClick={handleClick}>{ERROR_BOUNDARY_MESSAGES.BUTTON}</Button>
    </div>
  );
}

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="p-4">
        <ErrorMessage errorCode={error.status} />
      </div>
    );
  }
  if (error instanceof ApiError) {
    return <ErrorMessage errorCode={error.status} />;
  }
  return <FallbackUI />;
}
