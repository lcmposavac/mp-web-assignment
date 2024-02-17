import React, { PropsWithChildren } from "react";

export class ErrorBoundary extends React.Component<
  PropsWithChildren<Record<string, unknown>>,
  { hasError: boolean }
> {
  constructor(props: PropsWithChildren<Record<string, unknown>>) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: unknown) {
    // LogRocket.captureException(error);
    console.error(error);
    console.error(info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export class EditorErrorBoundary extends React.Component<
  PropsWithChildren<Record<string, unknown>>,
  { hasError: boolean }
> {
  constructor(props: PropsWithChildren<Record<string, unknown>>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error(error);
    console.error(info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-20 w-full flex items-center">
          <div className="text-sm text-red-600 font-sm">
            Something went wrong! We are working on it but you can refresh the
            page for now to fix the error
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
