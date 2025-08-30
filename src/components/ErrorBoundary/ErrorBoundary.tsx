import { Component } from 'react';
import Button from '../Button';
import { ERROR_BOUNDARY_MESSAGES } from './messages';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  handleReload = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-6">
          <p>{ERROR_BOUNDARY_MESSAGES.DEFAULT_ERROR_MESSAGE}</p>
          <Button onClick={this.handleReload}>
            {ERROR_BOUNDARY_MESSAGES.BUTTON}
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
