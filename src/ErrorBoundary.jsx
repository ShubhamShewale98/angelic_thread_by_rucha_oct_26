import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("App render error:", error);
    console.error("Component stack:", info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <main role="alert" style={{ maxWidth: 720, margin: "3rem auto", padding: "1.5rem", fontFamily: "sans-serif" }}>
          <h1>The page could not be displayed</h1>
          <p>Open the browser console for the error details.</p>
          <pre style={{ whiteSpace: "pre-wrap" }}>{this.state.error.message}</pre>
        </main>
      );
    }

    return this.props.children;
  }
}
