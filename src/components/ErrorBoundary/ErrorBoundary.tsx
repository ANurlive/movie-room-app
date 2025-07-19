import React, { Component } from 'react';
import { ERROR_BOUNDARY_MESSAGES } from './messages';
import Button from '../Button/Button';

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type BoundaryState = {
  hasError: boolean;
};
export default class ErrorBoundary extends Component<Props, BoundaryState> {
  state: BoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(ERROR_BOUNDARY_MESSAGES.LOG, error, errorInfo);
  }

  handleClick = () => {
    this.setState({ hasError: false });
  };
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex flex-col gap-6 justify-center items-center ">
          {this.props.fallback ?? (
            <p>{ERROR_BOUNDARY_MESSAGES.DEFAULT_ERROR_MESSAGE}</p>
          )}
          <Button onClick={this.handleClick}>
            {ERROR_BOUNDARY_MESSAGES.BUTTON}
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
